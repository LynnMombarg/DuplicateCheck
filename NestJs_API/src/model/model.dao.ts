import { ModelDto } from './model.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ModelDao {
  constructor(@InjectModel(.name) private modelModel: Model<>) {}

  createModel(model: ModelDto) {
    const createdModel = new this.modelModel(model);
    createdModel.save();
  }
}
