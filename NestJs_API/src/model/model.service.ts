import { Injectable } from '@nestjs/common';
import { ModelDTO } from './display-model.DTO';
import { ModelDAO } from './model.modelDAO';

@Injectable()
export class ModelService {
  constructor(private readonly modelDAO: ModelDAO) {}

  async getAllModels(): Promise<ModelDTO[]> {
    return this.modelDAO.getAllModels();
  }

  async deleteModel(token: string, modelId: string): Promise<ModelDTO[]> {
    this.modelDAO.deleteModel(modelId);
    return this.modelDAO.getAllModels();
  }
}
