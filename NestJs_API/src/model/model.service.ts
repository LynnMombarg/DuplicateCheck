import { Injectable } from '@nestjs/common';
import { ModelDTO } from './model.modelDTO';
import { ModelDAO } from './model.modelDAO';

@Injectable()
export class ModelService {
  constructor(private readonly modelDAO: ModelDAO) {}

  async getAllModels(): Promise<ModelDTO[]>{
    return this.modelDAO.getAllModels();
  }

  async deleteModel(modelDTO: ModelDTO): Promise<ModelDTO[]>{
    this.modelDAO.deleteModel(modelDTO);
    return this.modelDAO.getAllModels();
  }
}
