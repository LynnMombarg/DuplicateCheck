// Authors: Marloes, Silke
// Jira-task: 130, 129
// Sprint: 3
// Last modified: 15-05-2023

import { Injectable } from '@nestjs/common';
import { TrainingDTO } from './dto/training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import { Model } from 'mongoose';
import { RecordDTO } from "./dto/record.dto";

@Injectable()
export class TrainingDAO {
  constructor(@InjectModel(Training.name) private model: Model<Training>) {}

  async createTraining(training: TrainingDTO) {
    //try {
    const createdTraining = new this.model(training);
    await createdTraining.save();
    //} catch {
    //  throw new NotFoundException();
    //}
  }


  async getNextRecords(trainingId: string): Promise<RecordDTO[]> {
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
