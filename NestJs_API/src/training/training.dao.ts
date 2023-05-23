// Authors: Marloes, Lynn, Silke
// Jira-task: 130, 137, 129
// Sprint: 3
// Last modified: 22-05-2023

import { Injectable } from '@nestjs/common';
import { TrainingDTO } from './dto/training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import mongoose from 'mongoose';
mongoose.Promise = Promise;
import { DatasetDTO } from './dto/dataset.dto';

@Injectable()
export class TrainingDAO {
  constructor(
    @InjectModel(Training.name) private model: mongoose.Model<Training>,
  ) {}

  async createTraining(training: TrainingDTO) {
    this.model.create(training);
  }

  async getNextRecords(id: string): Promise<DatasetDTO> {
    const training = await Promise.resolve(
      this.model.findOne({ trainingId: id }),
    );
    const lengthMatches = training.matches.length;
    const recordA = training.datasetA.records[lengthMatches];
    const recordB = training.datasetB.records[lengthMatches];
    return new DatasetDTO([recordA, recordB]);
  }

  async saveAnswer(id: string, answer: boolean) {
    await Promise.resolve(
      this.model.updateOne(
        { trainingId: id },
        { $push: { matches: { $each: [answer] } } },
      ),
    );
  }

  async checkForRecords(id: string): Promise<boolean> {
    const training = await Promise.resolve(
      this.model.findOne({ trainingId: id }),
    );
    const lengthMatches = training.matches.length;
    const lengthDatasets = training.datasetA.records.length;
    return lengthDatasets > lengthMatches;
  }

  async getTraining(id: string): Promise<TrainingDTO> {
    return await Promise.resolve(this.model.findOne({ trainingId: id }));
  }
}
