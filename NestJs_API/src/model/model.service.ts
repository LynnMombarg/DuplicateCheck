// Authors: Marloes, Roward, Silke
// Jira-task: 107, 110, 166
// Sprint: 2, 3
// Last modified: 15-05-2023

import { Injectable } from '@nestjs/common';
import { ModelDTO } from './dto/model.dto';
import { ModelDAO } from './model.dao';
import { CreateModelDTO } from './dto/create-model.dto';
import { PythonDAO } from '../python/python.dao';
import { v4 as uuid } from 'uuid';
import { SalesforceDAO } from '../salesforce/salesforce.dao';
import { JobDTO } from './dto/job-model.dto';
import { AuthDAO } from '../auth/auth.dao';
import { TrainingDAO } from '../training/training.dao';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDAO: ModelDAO,
    private readonly pythonDAO: PythonDAO,
    private readonly salesforceDAO: SalesforceDAO,
    private readonly authDAO: AuthDAO,
    private readonly trainingDAO: TrainingDAO,
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
    await this.trainingDAO.deleteTrainings(modelId);
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
}
