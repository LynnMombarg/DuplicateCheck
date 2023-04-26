// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { ModelDto } from './dto/model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from './model.schema';
import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelDao {
  constructor(@InjectModel(Model.name) private model: mongoose.Model<Model>) {}

  createModel(model: ModelDto) {
    const createdModel = new this.model(model);
    createdModel.save();
  }
}
