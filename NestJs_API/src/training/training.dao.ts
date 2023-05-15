// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 15-05-2023

import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingDTO } from './dto/training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import { Model } from 'mongoose';

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
}
