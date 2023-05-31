// Authors: Marloes, Roward
// Jira-task: 107, 110, 175
// Sprint: 2, 3, 4
// Last modified: 26-05-2023

import { Injectable } from '@nestjs/common';
import { ModelDTO } from './dto/model.dto';
import { ModelDAO } from './model.dao';
import { CreateModelDTO } from './dto/create-model.dto';
import { PythonDAO } from '../python/python.dao';
import { v4 as uuid } from 'uuid';
import { SalesforceDAO } from '../salesforce/salesforce.dao';
import { JobDTO } from './dto/job-model.dto';
import { AuthDAO } from '../auth/auth.dao';
import { ExecuteModelDTO } from './dto/execute-model.dto';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDAO: ModelDAO,
    private readonly pythonDAO: PythonDAO,
    private readonly salesforceDAO: SalesforceDAO,
    private readonly authDAO: AuthDAO,
  ) {}

  getAllModels(orgId: string): Promise<ModelDTO[]> {
    return this.modelDAO.getAllModels(orgId);
  }

  async createModel(createModel: CreateModelDTO, orgId: string): Promise<void> {
    const modelId: string = uuid();
    const model = new ModelDTO(
      createModel.modelName,
      modelId,
      createModel.tableName,
      createModel.modelDescription,
      orgId,
    );

    await this.modelDAO.createModel(model);
    await this.pythonDAO.createModel(modelId);
  }

  async deleteModel(orgId: string, modelId: string): Promise<void> {
    await this.modelDAO.deleteModel(modelId, orgId);
    await this.pythonDAO.deleteModel(modelId);
  }

  async getJobs(tableName: string, orgId: string): Promise<JobDTO[]> {
    const authDTO = await this.authDAO.getTokensByOrgId(orgId);
    let tableId = '';
    switch (tableName) {
      case 'leads':
        tableId = '00Q';
        break;
      case 'contacts':
        tableId = '003';
        break;
      case 'accounts':
        tableId = '001';
        break;
      default:
        tableId = 'error';
        break;
    }
    return this.salesforceDAO.getJobs(tableId, authDTO);
  }

  async executeModel(
    executeModel: ExecuteModelDTO,
    orgId: string,
  ): Promise<[string, string]> {
    const authDTO = await this.authDAO.getTokensByOrgId(orgId);
    const fields = await this.salesforceDAO.getFields(
      executeModel.tableName,
      authDTO,
    );
    const [record1, record2] = await this.salesforceDAO.getRecords(
      fields,
      executeModel.tableName,
      executeModel.recordId1,
      executeModel.recordId2,
      authDTO,
    );
    return this.pythonDAO.executeModel(record1, record2, executeModel.modelId);
  }
}
