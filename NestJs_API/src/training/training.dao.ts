// Authors: Marloes, Lynn, Silke
// Jira-task: 130, 137, 129, 166
// Sprint: 3
// Last modified: 22-05-2023

import { Injectable } from '@nestjs/common';
import { TrainingDTO } from './dto/training.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './schema/training.schema';
import mongoose from 'mongoose';
mongoose.Promise = Promise;

@Injectable()
export class TrainingDAO {
  constructor(
    @InjectModel(Training.name) private model: mongoose.Model<Training>,
  ) {}

  async createTraining(training: TrainingDTO) {
    this.model.create(training);
  }

  async saveAnswer(id: string, answer: boolean) {
    await Promise.resolve(
      this.model.updateOne(
        { trainingId: id },
        { $push: { matches: { $each: [answer] } } },
      ),
    );
  }

  getTraining(id: string): Promise<TrainingDTO> {
    return this.model.findOne({ trainingId: id });
  }

  async deleteTrainings(id: string) {
    await Promise.resolve(this.model.deleteMany({ modelId: id }));
  }
}
