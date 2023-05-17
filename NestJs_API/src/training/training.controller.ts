// Authors: Silke, Marloes
// Jira-task: 129, 130
// Sprint: 3
// Last modified: 16-05-2023

import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingService } from './training.service';
import { DatasetDTO } from './dto/dataset.dto';

@Controller('training')
@UseGuards(AuthGuard)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async selectJob(jobId: string, @Req() req): Promise<string> {
    return await this.trainingService.selectJob(jobId, req.user.userId);
  }

  @Get('/records')
  getRecords(
    @Query('trainingId') trainingId: string,
    @Req() req,
  ): Promise<DatasetDTO> {
    return this.trainingService.getRecords(trainingId, req);
  }

  @Post('/give-answer')
  giveAnswer(
    @Query('answer') answer: boolean,
    @Query('trainingId') trainingId: string,
    @Req() req,
  ): Promise<void> {
    return this.trainingService.giveAnswer(answer, trainingId, req);
  }

  @Get('/check-records')
  checkForRecords(
    @Query('trainingId') trainingId: string,
    @Req() req,
  ): Promise<boolean> {
    return this.trainingService.checkForRecords(trainingId, req);
  }
}
