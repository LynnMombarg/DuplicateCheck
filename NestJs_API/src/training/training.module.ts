import { Module } from '@nestjs/common';
import { ModelController } from './training.controller';

@Module({
  controllers: [ModelController],
  providers: [],
})
export class TrainingModule {}
