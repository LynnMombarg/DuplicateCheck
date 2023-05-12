import { Injectable, Req } from '@nestjs/common';
import { RecordDTO } from './RecordDTO';
import { AuthDAO } from '../auth/auth.dao';
import { TrainingDOA } from './TrainingDOA';

@Injectable()
export class TrainingService {
  constructor(private readonly TrainingDOA: TrainingDOA) {}

  async getRecords(trainingID: string, @Req() req): Promise<RecordDTO[]> {
    const userId = AuthDAO.getuserID();
    if (userId != null) {
      return this.TrainingDOA.getNextRecords(trainingID);
    }
  }

  async giveAnswer(
    answer: boolean,
    trainingID: string,
    @Req() req,
  ): Promise<void> {
    const userid = AuthDAO.getuserID();
    if (userid != null && answer == true) {
      this.TrainingDOA.saveRecord(trainingID);
    }
  }
}
