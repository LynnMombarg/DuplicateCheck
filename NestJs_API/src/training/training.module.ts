import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from "./training.service";
import { TrainingDao } from "./training.dao";
import { MongooseModule } from "@nestjs/mongoose";
import { TrainingSchema } from "./schema/training.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Training', schema: TrainingSchema }]),

  ],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingDao],
})
export class TrainingModule {}
