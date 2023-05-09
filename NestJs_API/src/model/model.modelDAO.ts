import { InjectModel } from '@nestjs/mongoose';
import { Model } from './model.schema';
import mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelDTO } from './display-model.DTO';

// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023
@Injectable()
export class ModelDAO {
  constructor(
    @InjectModel(Model.name) private modelModel: mongoose.Model<Model>,
  ) {}

  async getAllModels(userId: string): Promise<ModelDTO[]> {
    return this.modelModel.find({ userId: userId }).exec();
  }

  async deleteModel(modelId: string, userId: string): Promise<void> {
    const result = await this.modelModel.deleteOne({
      modelId: modelId,
      userId: userId,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException();
    }
  }
}
