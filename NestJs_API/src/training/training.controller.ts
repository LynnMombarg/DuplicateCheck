// Authors: Marloes, Lynn
// Jira-task: 130
// Sprint: 3
// Last modified: 15-05-2023

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('training')
@UseGuards(AuthGuard)
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  selectJob(jobId: string, @Req() req) {
    this.trainingService.selectJob(jobId, req.user.userId);
  }

  @Post('/save')
  saveTraining(@Body() json, @Req() req) {
      this.trainingService.saveTraining(json['modelId'], json['trainingId'], '123'); //123 = req.user.userId
  }

}
