import {
  Controller,
  Get,
  Delete,
  Body,
  HttpStatus,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDTO } from './model.modelDTO';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('/models')
  getAllModels(): Promise<ModelDTO[]>{
    return this.modelService.getAllModels();
  }

  @Delete()
  delete(@Body() model: ModelDTO): Promise<ModelDTO[]> {
    return this.modelService.deleteModel(model);
  }

}
