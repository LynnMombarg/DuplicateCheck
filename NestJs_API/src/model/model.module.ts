import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { Model } from 'mongoose';
import { ModelSchema } from './model.schema';
import { ModelDAO } from './model.modelDAO';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }]),
  ],
  controllers: [ModelController],
  providers: [ModelService, ModelDAO],
})
export class ModelModule {}
