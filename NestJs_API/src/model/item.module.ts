import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pascal:ditIsEenLeukProject23@mar.jbpp1g5.mongodb.net/DuplicateCheck',
    ),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
