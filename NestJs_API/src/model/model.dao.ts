import { ModelDto } from './model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from './model.schema';
import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelDao {
  constructor(
    @InjectModel(Model.name) private modelModel: mongoose.Model<Model>,
  ) {}

  createModel(model: ModelDto) {
    const createdModel = new this.modelModel(model);
    createdModel.save();
  }
}
