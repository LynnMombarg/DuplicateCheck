// Authors: Lynn
// Jira-task: 
// Sprint: 3
// Last modified: 12-05-2023

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TrainingDocument = HydratedDocument<Training>;

@Schema()
export class Training {
  @Prop()
  modelId: string;

  @Prop()
  trainingId: string;

  //dataframeA, dataframeB and golden_matches
  @Prop()
  dataframe: string[][];

  @Prop()
  userId: string;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
