import { InjectModel } from '@nestjs/mongoose';
import { Model } from './model.schema';
import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { DisplayDTO } from './display-model.DTO';

@Injectable()
export class ModelDAO {
  constructor(
    @InjectModel(Model.name) private modelModel: mongoose.Model<Model>,
  ) {}

  async getAllModels(userId: string): Promise<DisplayDTO[]> {
    return this.modelModel.find({ userId: userId }, { userId: 0, _id: 0}).exec();
  }
}
