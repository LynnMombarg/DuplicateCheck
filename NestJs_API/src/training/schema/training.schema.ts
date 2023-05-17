// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dataset, DatasetSchema } from './dataset.schema';
import { HydratedDocument } from 'mongoose';
import { Model } from '../../model/schema/model.schema';

export type TrainingDocument = HydratedDocument<Model>;

@Schema()
export class Training {
  @Prop()
  trainingId: string;

  @Prop()
  userId: string;

  @Prop({ type: DatasetSchema, ref: Dataset.name })
  datasetA: Dataset;

  @Prop({ type: DatasetSchema, ref: Dataset.name })
  datasetB: Dataset;

  @Prop([Boolean])
  matches: boolean[];
}
export const TrainingSchema = SchemaFactory.createForClass(Training);
