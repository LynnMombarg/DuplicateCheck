// Authors: Marloes, Roward, Silke
// Jira-task: 107, 110, 115
// Sprint: 2, 3
// Last modified: 12-05-2023

import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDTO } from './dto/create-model.dto';
import { ModelDTO } from './dto/model.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JobDTO } from './dto/job-model.dto';

@Controller('model')
// @UseGuards(AuthGuard)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('/create')
  async createModel(@Body() model: CreateModelDTO, @Req() req) {
    await this.modelService.createModel(model, req.user.userId);
    return await this.modelService.getAllModels(req.user.userId);
  }

  @Get('/models')
  getAllModels(@Req() req): Promise<ModelDTO[]> {
    return this.modelService.getAllModels(/*req.user.userId*/ "test123");
  }

  @Delete()
  async deleteModel(
    @Req() req,
    @Query('modelId') modelId,
  ): Promise<ModelDTO[]> {
    await this.modelService.deleteModel(req.user.userId, modelId);
    return await this.modelService.getAllModels(req.user.userId);
  }

  @Get('/jobs')
  getJobs(@Req() req, @Query('tableName') tableName): Promise<JobDTO[]> {
    return this.modelService.getJobs(tableName, req.user.userId);
  }
}
