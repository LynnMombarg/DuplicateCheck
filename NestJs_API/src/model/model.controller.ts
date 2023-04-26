import { Controller, Get, Delete, Query, Headers } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDTO } from './display-model.DTO';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('/models')
  getAllModels(): Promise<ModelDTO[]> {
    return this.modelService.getAllModels();
  }

  @Delete()
  deleteModel(
    @Headers('Authorization') accessToken,
    @Query('modelId') modelId,
  ): Promise<ModelDTO[]> {
    return this.modelService.deleteModel(accessToken, modelId);
  }
}
