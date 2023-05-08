// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModelDocument = HydratedDocument<Model>;

@Schema()
export class Model {
  @Prop()
  modelName: string;

  @Prop()
  modelId: string;

  @Prop()
  tableName: string;

  @Prop()
  userId: string;

  @Prop()
  modelDescription: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
