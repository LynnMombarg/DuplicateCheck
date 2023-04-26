import { Injectable } from '@nestjs/common';
import { ModelDAO } from './model.DAO';
import { DisplayDTO } from './display-model.DTO';

@Injectable()
export class ModelService {
  constructor(private readonly modelDAO: ModelDAO) {}

  async getAllModels(accessToken: string): Promise<DisplayDTO[]> {
    const userId = 'test';
    return this.modelDAO.getAllModels(userId);
  }
}
