// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 15-05-2023

import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTrainingDTO } from './dto/create-training.dto';

@Controller('training')
@UseGuards(AuthGuard)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  selectJob(@Body() training : CreateTrainingDTO, @Req() req) {
    this.trainingService.selectJob(training.jobId, training.tableName, req.user.userId);
  }

}
