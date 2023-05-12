// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingDAO } from './training.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Training, TrainingSchema } from './schema/training.schema';
import { AuthModule } from '../auth/auth.module';
import { SalesforceModule } from '../salesforce/salesforce.module';
import { Record, RecordSchema } from './schema/record.schema';
import { Dataset, DatasetSchema } from './schema/dataset.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Record.name, schema: RecordSchema },
      { name: Dataset.name, schema: DatasetSchema },
      { name: Training.name, schema: TrainingSchema },
    ]),
    AuthModule,
    SalesforceModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingDAO],
})
export class TrainingModule {}
