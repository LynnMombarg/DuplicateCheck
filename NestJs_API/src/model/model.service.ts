// Authors: Marloes
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 12-05-2023

import { Injectable } from '@nestjs/common';
import { ModelDTO } from './dto/model.dto';
import { ModelDAO } from './model.dao';
import { CreateModelDTO } from './dto/create-model.dto';
import { PythonDAO } from '../python/python.dao';
import { v4 as uuid } from 'uuid';
import { SalesforceDAO } from 'src/salesforce/salesforce.dao';
import { JobDTO } from './dto/job-model.dto';
import { AuthDAO } from 'src/auth/auth.dao';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDAO: ModelDAO,
    private readonly pythonDAO: PythonDAO,
    private readonly salesforceDAO: SalesforceDAO,
    private readonly authDAO: AuthDAO,
  ) {}

  async getAllModels(userId: string): Promise<ModelDTO[]> {
    return this.modelDAO.getAllModels(userId);
  }

  async createModel(
    createModel: CreateModelDTO,
    userId: string,
  ): Promise<void> {
    const modelId: string = uuid();
    const model = new ModelDTO(
      createModel.modelName,
      modelId,
      createModel.tableName,
      createModel.modelDescription,
      userId,
    );

    await this.modelDAO.createModel(model);
    await this.pythonDAO.createModel(modelId);
  }

  async deleteModel(userId: string, modelId: string): Promise<void> {
    await this.modelDAO.deleteModel(modelId, userId);
    await this.pythonDAO.deleteModel(modelId);
  }

  async getJobs(tableName: string, userId: string): Promise<JobDTO[]>{
    const authDTO = await this.authDAO.getTokensByUserId(userId);
    return this.salesforceDAO.getJobs(tableName, authDTO);
  }
}
