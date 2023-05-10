// Authors: Marloes
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelDTO } from './dto/model.dto';
import { ModelData } from './model.data';
import { CreateModelDTO } from './dto/create-model.dto';
import { AuthDAO } from '../auth/auth.dao';
import { PythonDAO } from '../python/python.dao';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDAO: ModelData,
    private readonly authDAO: AuthDAO,
    private readonly pythonDAO: PythonDAO,
  ) {}

  async getAllModels(token: string): Promise<ModelDTO[]> {
    const userId = this.authDAO.getUserId(token);
    return this.modelDAO.getAllModels(userId);
  }

  async createModel(createModel: CreateModelDTO, token: string): Promise<void> {
    const userId: string = this.authDAO.getUserId(token);
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

  async deleteModel(token: string, modelId: string): Promise<void> {
    const userId = this.authDAO.getUserId(token);
    if (userId === null) {
      throw new UnauthorizedException();
    } else {
      await this.modelDAO.deleteModel(modelId, userId);
      await this.pythonDAO.deleteModel(modelId);
    }
  }
}
