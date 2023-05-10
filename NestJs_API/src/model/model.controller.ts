// Authors: Marloes, Roward
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import { Body, Controller, Post, Req, Get, Delete, Headers, Query } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDTO } from './dto/create-model.dto';
import { ModelDTO } from './dto/model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get('/models')
  getAllModels(
    @Headers('Authorization') accesToken: string
  ): Promise<ModelDTO[]> {
    return this.modelService.getAllModels(accesToken);
  }
  @Post('create')
  createModel(@Body() model: CreateModelDTO, @Req() request) {
    this.modelService.createModel(model, /*request.user.userid*/ 'token');
  }

  @Delete()
  deleteModel(
    @Headers('Authorization') accessToken,
    @Query('modelId') modelId,
  ): Promise<ModelDTO[]> {
    this.modelService.deleteModel(accessToken, modelId);
    return this.modelService.getAllModels();
  }
}
