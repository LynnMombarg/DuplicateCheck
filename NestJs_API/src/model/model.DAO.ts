// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { ModelDTO } from './dto/model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from './model.schema';
import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelDAO {
  constructor(@InjectModel(Model.name) private model: mongoose.Model<Model>) {}

  createModel(model: ModelDTO) {
    const createdModel = new this.model(model);
    createdModel.save();
  }

  async getAllModels(): Promise<ModelDTO[]> {
    return this.model.find().exec();
  }

  async deleteModel(modelId: string): Promise<void> {
    await this.model.deleteOne({
      modelId: modelId,
    });
  }
}
