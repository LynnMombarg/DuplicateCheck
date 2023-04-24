import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from '../item/item.schema';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { MlModel } from './model.schema';
import { ModelDao } from './model.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MlModel.name, schema: ItemSchema }]),
  ],
  controllers: [ModelController],
  providers: [ModelService, ModelDao],
})
export class ModelModule {}
