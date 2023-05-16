// Authors: Marloes, Lynn
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

    async getTraining(trainingId: string): Promise<TrainingDTO> {
        console.log(JSON.stringify(this.model.find().exec()));
        //return await this.model.find({ trainingId: trainingId }).exec(); //Format aanpassen
    }

    async createTraining(training: TrainingDTO) {
      //try {
      const createdTraining = new this.model(training);
      await createdTraining.save();
      //} catch {
      //  throw new NotFoundException();
      //}
    }
    
}
