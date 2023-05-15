import { Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from '../auth/auth.guard';
import { TrainingService } from './training.service';
import { RecordDto } from './dto/record.dto';

// Authors: Silke
// Jira-task: 123
// Sprint: 3
// Last modified: 15-05-2023


@Controller('training')
//@UseGuards(AuthGuard)
export class TrainingController {
  constructor(private readonly TrainingService: TrainingService) {}

  @Get('/records')
  getRecords(@Query('trainingId') trainingId: string, @Req() req): Promise<RecordDto[]> {
    return this.TrainingService.getRecords(trainingId, req);
  }

  @Post('/giveAnswer')
  giveAnswer(@Query('answer') answer: boolean, @Query('trainingId') trainingId: string, @Req() req): Promise<void> {
    return this.TrainingService.giveAnswer(answer, trainingId, req);
  }

  @Get('/checkForRecords')
  checkForRecords(@Query('trainingId') trainingId: string, @Req() req): Promise<boolean> {
    return this.TrainingService.checkForRecords(trainingId, req);
  }
}
