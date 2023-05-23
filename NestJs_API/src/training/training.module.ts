// Authors: Lynn
// Jira-task: 130
// Sprint: 3
// Last modified: 15-05-2023

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingDAO } from './training.dao';
import { Training, TrainingSchema } from './schema/training.schema';
import { PythonModule } from '../python/python.module';
import { AuthModule } from '../auth/auth.module';
import { PythonDAO } from '../python/python.dao';
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
    PythonModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingDAO, PythonDAO],
})

export class TrainingModule {}

