// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { ModelDAO } from './model.dao';
import { Model, ModelSchema } from './schema/model.schema';
import { PythonModule } from '../python/python.module';
import { AuthModule } from '../auth/auth.module';
import { SalesforceModule } from '../salesforce/salesforce.module';
import { TrainingModule } from '../training/training.module';
import { Training, TrainingSchema } from '../training/schema/training.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Model.name, schema: ModelSchema },
      { name: Training.name, schema: TrainingSchema },
    ]),

    PythonModule,
    AuthModule,
    SalesforceModule,
    TrainingModule,
  ],
  controllers: [ModelController],
  providers: [ModelService, ModelDAO],
})
export class ModelModule {}
