import { Injectable } from '@nestjs/common';
import { RecordDto } from './dto/record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrainingDAO {
  constructor(@InjectModel(Training.name) private model: Model<Training>) {}

  async getNextRecords(trainingId: string): Promise<RecordDto[]> {
    return null;
  }

  async saveRecord(trainingID: string) {
    //this.model.updateOne({ trainingId: trainingID }, { $addToSet });
    return null;
  }

  checkForRecords(trainingID: string): Promise<boolean> {
   // this.model.findOne({ trainingId: trainingID });
    return null;
  }
}
