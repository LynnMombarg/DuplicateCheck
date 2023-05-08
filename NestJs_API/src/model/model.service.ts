// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelDTO } from './display-model.DTO';
import { ModelDAO } from './model.modelDAO';
import { AuthDAO } from '../login/auth.dao';
import { PythonDAO } from '../python/python.dao';

@Injectable()
export class ModelService {
  constructor(
    private readonly modelDAO: ModelDAO,
    private readonly authDAO: AuthDAO,
    private readonly pythonDAO: PythonDAO
  ) {}

  async getAllModels(): Promise<ModelDTO[]> {
    return this.modelDAO.getAllModels();
  }

  deleteModel(token: string, modelId: string): void {
    if (this.authDAO.getUserId(token) == null) {
      throw new UnauthorizedException();
    } else {
      this.modelDAO.deleteModel(modelId);
      this.pythonDAO.deleteModel(modelId);
    }
  }
}
