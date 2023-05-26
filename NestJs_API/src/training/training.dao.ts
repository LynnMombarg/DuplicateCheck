// Authors: Marloes, Lynn, Silke
// Jira-task: 130, 137, 129
// Sprint: 3
// Last modified: 22-05-2023

import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingDTO } from './dto/training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import mongoose from 'mongoose';
import { DatasetDTO } from './dto/dataset.dto';
mongoose.Promise = Promise;

@Injectable()
export class TrainingDAO {
  constructor(
    @InjectModel(Training.name) private model: mongoose.Model<Training>,
  ) {}

  async createTraining(training: TrainingDTO) {
    this.model.create(training);
  }

  async getNextRecords(trainingId: string): Promise<DatasetDTO> {
    const training = await this.model.findOne({ trainingId: trainingId });
    if (!training) {
      throw new NotFoundException('Training not found');
    }
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
    if (!training) {
      throw new NotFoundException('Training not found');
    }
    const lengthMatches = training.matches.length;
    const lengthDatasets = training.datasetA.records.length;
    return lengthDatasets > lengthMatches;
  }

  async getTraining(trainingId: string): Promise<TrainingDTO> {
    return await this.model.findOne({ trainingId: trainingId });
  }
}
