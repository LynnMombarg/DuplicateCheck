import { Controller, Get } from '@nestjs/common';
import { models } from 'mongoose';
import { ModelDAO } from './ModelDAO';

@Controller('models')
export class MOdelController {
  ModelDAO: ModelDAO = new ModelDAO();

  @Get('/all')
  login(): void {
    return ModelDAO.getAllModels();
  }
}
