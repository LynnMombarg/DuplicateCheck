import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingDAO } from './training.dao';
import { Training, TrainingSchema } from './training.schema';
import { PythonModule } from '../python/python.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Training.name, schema: TrainingSchema }]),
    PythonModule,
    AuthModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingDAO],
})

export class TrainingModule {}