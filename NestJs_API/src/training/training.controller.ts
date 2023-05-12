import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingService } from './training.service';
import { RecordDTO } from './RecordDTO';

@Controller('training')
@UseGuards(AuthGuard)
export class ModelController {
  constructor(private readonly TrainingService: TrainingService) {}

  @Get('/records')
  getRecords(trainingID: string, @Req() req): Promise<RecordDTO[]> {
    return this.TrainingService.getRecords(trainingID, req);
  }

  @Post('/giveAnswer')
  giveAnswer(answer: boolean, trainingID: string, @Req() req): Promise<void> {
    return this.TrainingService.giveAnswer(answer, trainingID, req);
  }
}
