import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelController } from './model.controller';
// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023

import { ModelService } from './model.service';
import { Model } from 'mongoose';
import { ModelSchema } from './model.schema';
import { ModelDAO } from './model.modelDAO';
import { PythonDAO } from 'src/python/python.dao';
import { AuthDAO } from 'src/login/auth.dao';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }]),
  ],
  controllers: [ModelController],
  providers: [ModelService, ModelDAO, AuthDAO, PythonDAO],
})
export class ModelModule {}
