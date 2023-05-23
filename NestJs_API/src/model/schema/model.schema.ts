// Authors: Marloes
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  modelDescription: string;

  @Prop()
  orgId: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
