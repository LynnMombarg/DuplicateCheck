import { Controller, Get } from '@nestjs/common';
import { models } from 'mongoose';
import { ModelService } from './ModelService';
import {PythonService} from "../python/python.service";

@Controller('model')
export class ModelController {
  constructor(private readonly ModelService: ModelService) {}

  @Get('/getAllModels')
  all(): void {
    return this.ModelService.getAllModels();
  }

  @Get('/getModel')
  model(): void {
    return this.ModelService.getModel();
  }
}
