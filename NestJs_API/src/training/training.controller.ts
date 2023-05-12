import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingService } from './training.service';
import { RecordDto } from './dto/record.dto';

@Controller('training')
@UseGuards(AuthGuard)
export class TrainingController {
  constructor(private readonly TrainingService: TrainingService) {}

  @Get('/records')
  getRecords(trainingID: string, @Req() req): Promise<RecordDto[]> {
    return this.TrainingService.getRecords(trainingID, req);
  }

  @Post('/giveAnswer')
  giveAnswer(answer: boolean, trainingID: string, @Req() req): Promise<void> {
    return this.TrainingService.giveAnswer(answer, trainingID, req);
  }

  @Get('/checkForRecords')
  checkForRecords(trainingID: string, @Req() req): Promise<boolean> {
    return this.TrainingService.checkForRecords(trainingID, req);
  }
}
