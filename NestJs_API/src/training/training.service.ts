import { Injectable, Req } from '@nestjs/common';
import { RecordDto } from './dto/record.dto';
import { TrainingDao } from './Training.dao';

@Injectable()
export class TrainingService {
  constructor(private readonly TrainingDOA: TrainingDao) {}

  async getRecords(trainingID: string, @Req() req): Promise<RecordDto[]> {
    return this.TrainingDOA.getNextRecords(trainingID);
  }

  async giveAnswer(
    answer: boolean,
    trainingID: string,
    @Req() req,
  ): Promise<void> {
    await this.TrainingDOA.saveRecord(trainingID);
  }

  checkForRecords(trainingID: string, req): Promise<boolean> {
    return this.TrainingDOA.checkForRecords(trainingID);
  }
}
