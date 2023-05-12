import { Injectable } from '@nestjs/common';
import { RecordDTO } from './RecordDTO';

@Injectable()
export class TrainingDOA {
  constructor() {}

  async getNextRecords(trainingId: string): Promise<RecordDTO[]> {
    return null;
  }

  async saveRecord(trainingID: string) {
    return null;
    
  }
}
