// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { Model, ModelSchema } from './model.schema';
import { ModelDAO } from './model.dao';
import { LoginModule } from '../login/login.module';
import { PythonModule } from '../python/python.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }]),
    PythonModule,
    LoginModule,
  ],
  controllers: [ModelController],
  providers: [ModelService, ModelDAO],
})
export class ModelModule {}
