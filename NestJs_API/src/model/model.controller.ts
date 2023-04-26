import {
  Controller,
  Get,
  Delete,
  Query,
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
  deleteModel(@Query('modelId') modelId): Promise<ModelDTO[]> {
    return this.modelService.deleteModel(modelId);
  }

}
