// Authors: Marloes, Roward
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDTO } from './dto/create-model.dto';
import { ModelDTO } from './dto/model.dto';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('/create')
  async createModel(
    @Body() model: CreateModelDTO,
    @Headers('Authorization') accessToken,
    @Req() request,
  ): Promise<ModelDTO[]> {
    await this.modelService.createModel(model, /*request.user.userid*/ 'token');
    return this.modelService.getAllModels(accessToken);
  }

  @Get('/models')
  getAllModels(@Headers('Authorization') accessToken): Promise<ModelDTO[]> {
    return this.modelService.getAllModels(accessToken);
  }

  @Delete()
  async deleteModel(
    @Headers('Authorization') accessToken,
    @Query('modelId') modelId,
  ): Promise<ModelDTO[]> {
    await this.modelService.deleteModel(accessToken, modelId);
    return this.modelService.getAllModels(accessToken);
  }
}
