import { Injectable } from '@nestjs/common';
import { RecordDto } from './dto/record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import { Model } from 'mongoose';

// Authors: Silke
// Jira-task: 123
// Sprint: 3
// Last modified: 15-05-2023


@Injectable()
export class TrainingDao {
  constructor(@InjectModel(Training.name) private model: Model<Training>) {}

  async getNextRecords(trainingId: string): Promise<RecordDto[]> {
    const training = await this.model.findOne({ trainingId: trainingId }).exec();
    const lengthMatches = training.matches.length;
    const recordA = training.datasetA.records[lengthMatches];
    const recordB = training.datasetB.records[lengthMatches];
    const records = [recordA, recordB];
    return records;
  }

  async saveRecord(trainingId: string, answer: boolean) {
    await this.model.updateOne(
      { trainingId: trainingId },
      { $push: { matches: { $each: [answer] } } },
    );
  }

  async checkForRecords(trainingId: string): Promise<boolean> {
    const training = await this.model.findOne({ trainingId: trainingId }).exec();
    const lengthMatches = training.matches.length;
    const lengthDatasets = training.datasetA.records.length;
    if (lengthDatasets > lengthMatches) {
      return true;
    } else {
      return false;
    }
  }
}
