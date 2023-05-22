// Authors: Marloes, Roward
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 10-05-2023

import { ModelDTO } from './dto/model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from './schema/model.schema';
import mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ModelDAO {
  constructor(@InjectModel(Model.name) private model: mongoose.Model<Model>) {}

  async createModel(model: ModelDTO): Promise<void> {
    const createdModel = new this.model(model);
    await createdModel.save();
  }

  async getAllModels(userId: string): Promise<ModelDTO[]> {
    return this.model.find({ userId: userId });
  }

  async deleteModel(modelId: string, userId: string): Promise<void> {
    const result = await this.model.deleteOne({
      modelId: modelId,
      userId: userId,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
