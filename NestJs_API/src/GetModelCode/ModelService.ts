import { Injectable } from '@nestjs/common';
import { ModelDAO } from './ModelDAO';

@Injectable()
export class ModelService {
  constructor(private readonly ModelDAO: ModelDAO) {}

  getAllModels(): void {
    console.log('getAllModels()');
    this.ModelDAO.getAllModels();
  }

  getModel() {
    console.log('getModel()');
    this.ModelDAO.getModel();
  }
}
