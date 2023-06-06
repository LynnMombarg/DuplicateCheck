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
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDTO } from './dto/create-model.dto';
import { ModelDTO } from './dto/model.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JobDTO } from './dto/job-model.dto';

@Controller('model')
@UseGuards(AuthGuard)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('/create')
  async createModel(@Body() model: CreateModelDTO, @Req() req) {
    try {
      await this.modelService.createModel(model, req.user.orgId);
      return this.modelService.getAllModels(req.user.orgId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/models')
  getAllModels(@Req() req): Promise<ModelDTO[]> {
    try {
      return this.modelService.getAllModels(req.user.orgId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Delete()
  async deleteModel(
    @Req() req,
    @Query('modelId') modelId,
  ): Promise<ModelDTO[]> {
    try {
      await this.modelService.deleteModel(req.user.orgId, modelId);
      return this.modelService.getAllModels(req.user.orgId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/jobs')
  getJobs(@Req() req, @Query('tableName') tableName): Promise<JobDTO[]> {
    try {
      return this.modelService.getJobs(tableName, req.user.orgId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
