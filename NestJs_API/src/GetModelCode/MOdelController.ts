import { Controller, Get } from '@nestjs/common';
import { ModelService } from './ModelService';

@Controller('model')
export class ModelController {
  constructor(private readonly ModelService: ModelService) {}

  @Get('/getAllModels')
  all(): Model {
    return this.ModelService.getAllModels();
  }

  @Get('/getModel')
  model(): Model {
    return this.ModelService.getModel();
  }
}
