// Authors: Marloes, Lynn, Silke
// Jira-task: 130, 137, 129
// Sprint: 3
// Last modified: 16-05-2023

import {
  Body,
  Controller,
  Get,
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
    return await this.trainingService.selectJob(
      training.jobId,
      training.tableName,
      req.user.userId,
    );
  }

  @Get('/records')
  getRecords(@Query('trainingId') trainingId: string): Promise<DatasetDTO> {
    return this.trainingService.getRecords(trainingId);
  }

  @Put('/give-answer')
  giveAnswer(@Body() answer: AnswerDTO) {
    this.trainingService.giveAnswer(answer.answer, answer.trainingId);
  }

  @Get('/check-records')
  checkForRecords(@Query('trainingId') trainingId: string): Promise<boolean> {
    return this.trainingService.checkForRecords(trainingId);
  }

  @Post('/save')
  saveTraining(@Body() json, @Req() req) {
      this.trainingService.saveTraining(json['modelId'], json['trainingId'], '123'); //123 = req.user.userId
  }

}
