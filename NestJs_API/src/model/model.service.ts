// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelDTO } from './dto/model.dto';
import { ModelDAO } from './model.dao';
import { CreateModelDTO } from './dto/create-model.dto';
import { AuthDAO } from '../login/auth.dao';
import { PythonDAO } from '../python/python.dao';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDao: ModelDAO,
    private readonly authDao: AuthDAO,
    private readonly pythonDao: PythonDAO,
  ) {}

  public createModel(createModel: CreateModelDTO): void {
    const userId: string = this.authDao.getUserId(createModel.token);

    if (userId != null) {
      const modelId: string = uuid();
      const model = new ModelDTO(
        createModel.modelName,
        modelId,
        createModel.tableName,
        createModel.modelDescription,
        userId,
      );
      this.modelDao.createModel(model);
      this.pythonDao.createModel(modelId);
    } else {
      throw new UnauthorizedException();
    }
  }
}
