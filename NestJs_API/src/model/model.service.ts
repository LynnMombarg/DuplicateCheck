import { Injectable } from '@nestjs/common';
import { ModelDto } from './model.dto';
import { ModelDao } from './model.dao';

@Injectable()
export class ModelService {
  constructor(private readonly modelDao: ModelDao) {}

  createModel(model: ModelDto) {
    this.modelDao.createModel(model);
  }
}
