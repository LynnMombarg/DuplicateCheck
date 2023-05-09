// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023

import { Controller, Get, Delete, Query, Headers } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDTO } from './display-model.DTO';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('/models')
  getAllModels(@Headers('Authorization') accessToken,): Promise<ModelDTO[]> {
    return this.modelService.getAllModels(accessToken);
  }

  @Delete()
  async deleteModel(
    @Headers('Authorization') accessToken,
    @Query('modelId') modelId,
  ): Promise<ModelDTO[]> {
    await this.modelService.deleteModel(accessToken, modelId);
    return await this.modelService.getAllModels(accessToken);
  }
}
