// Authors: Marloes, Silke
// Jira-task: 130, 129
// Sprint: 3
// Last modified: 22-05-2023

import { Injectable } from '@nestjs/common';
import { TrainingDTO } from './dto/training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import { Model } from 'mongoose';
import { DatasetDTO } from './dto/dataset.dto';

@Injectable()
export class TrainingDAO {
  constructor(@InjectModel(Training.name) private model: Model<Training>) {}

  async createTraining(training: TrainingDTO) {
    //const createdTraining = new this.model(training);
    //await createdTraining.save();
    this.model.create(training);
  }

  async getNextRecords(trainingId: string): Promise<DatasetDTO> {
    const training = await this.model.findOne({ trainingId: trainingId });
    const lengthMatches = training.matches.length;
    const recordA = training.datasetA.records[lengthMatches];
    const recordB = training.datasetB.records[lengthMatches];
    return new DatasetDTO([recordA, recordB]);
  }

  async saveAnswer(trainingId: string, answer: boolean) {
    await this.model.updateOne(
      { trainingId: trainingId },
      { $push: { matches: { $each: [answer] } } },
    );
  }

  async checkForRecords(trainingId: string): Promise<boolean> {
    const training = await this.model.findOne({ trainingId: trainingId });
    const lengthMatches = training.matches.length;
    const lengthDatasets = training.datasetA.records.length;
    return lengthDatasets > lengthMatches;
  }

}
