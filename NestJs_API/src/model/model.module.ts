// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { ModelData } from './model.data';
import { Model, ModelSchema } from './model.schema';
import { PythonModule } from '../python/python.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }]),
    PythonModule,
    AuthModule,
  ],
  controllers: [ModelController],
  providers: [ModelService, ModelData],
})
export class ModelModule {}
