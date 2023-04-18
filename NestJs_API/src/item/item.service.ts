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

  async create(item: ItemDto): Promise<void> {
    const createdItem = new this.itemModel(item);
    await createdItem.save();
  }

  async read(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async update(item: ItemDto): Promise<void> {
    await this.itemModel.updateOne(
      { modelId: item.modelId, orgId: item.orgId },
      { modelId: 4 },
    );
  }

  async delete(item: ItemDto): Promise<void> {
    await this.itemModel.deleteOne({
      modelId: item.modelId,
      orgId: item.orgId,
    });
  }
}
