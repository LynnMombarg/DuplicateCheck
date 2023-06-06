// Authors: Marloes, Lynn, Silke
// Jira-task: 130, 137, 129
// Sprint: 3
// Last modified: 16-05-2023

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingService } from './training.service';
import { DatasetDTO } from './dto/dataset.dto';
import { CreateTrainingDTO } from './dto/create-training.dto';
import { AnswerDTO } from './dto/answer.dto';

@Controller('training')
@UseGuards(AuthGuard)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async selectJob(
    @Body() training: CreateTrainingDTO,
    @Req() req,
  ): Promise<string> {
    try {
      return this.trainingService.selectJob(
        training.jobId,
        training.tableName,
        training.modelId,
        req.user.orgId,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/records')
  getRecords(@Query('trainingId') trainingId: string): Promise<DatasetDTO> {
    try {
      return this.trainingService.getRecords(trainingId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Put('/give-answer')
  giveAnswer(@Body() answer: AnswerDTO) {
    try {
      this.trainingService.giveAnswer(answer.answer, answer.trainingId);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/check-records')
  checkForRecords(@Query('trainingId') trainingId: string): Promise<boolean> {
    try {
      return this.trainingService.checkForRecords(trainingId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Put('/save')
  saveTraining(@Body() json) {
    try {
      this.trainingService.saveTraining(json['modelId'], json['trainingId']);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
