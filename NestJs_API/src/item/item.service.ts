import { InjectModel } from '@nestjs/mongoose';
import { Item } from './item.schema';
import mongoose from 'mongoose';
import { ItemDto } from './item.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: mongoose.Model<Item>,
  ) {}

  async create(itemDto: ItemDto): Promise<Item> {
    const createdItem = new this.itemModel(itemDto);
    return createdItem.save();
  }

  async read(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async update(itemDto: ItemDto): Promise<Item> {
    console.log(itemDto);
    return this.itemModel.findOneAndUpdate(
      { modelId: itemDto.modelId },
      { modelId: 2 },
      { new: true },
    );
  }
}
