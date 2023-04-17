import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.schema';
import mongoose from 'mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: mongoose.Model<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }
}
