import { Injectable } from '@nestjs/common';
import { ModelDAO } from './ModelDAO';

@Injectable()
export class ModelService {
  constructor(private readonly ModelDAO: ModelDAO) {}

  getAllModels(): Model {
    return this.ModelDAO.getAllModels();
  }

  getModel(): Model {
    return this.ModelDAO.getModel();
  }
}
