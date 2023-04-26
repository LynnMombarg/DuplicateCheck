import { InjectModel } from '@nestjs/mongoose';
import { Model } from './model.schema';
import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ModelDTO } from './display-model.DTO';
import { ItemDto } from 'src/item/item.dto';

@Injectable()
export class ModelDAO {
  constructor(
    @InjectModel(Model.name) private modelModel: mongoose.Model<Model>,
  ) {}

  async getAllModels(): Promise<ModelDTO[]> {
    return this.modelModel.find().exec();
  }

  async deleteModel(modelId: string): Promise<void> {
    await this.modelModel.deleteOne({
      modelId: modelId,
    });
  }
}
