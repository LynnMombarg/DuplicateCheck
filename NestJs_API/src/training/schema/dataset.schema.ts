// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Record, RecordSchema } from './record.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Model } from '../../model/schema/model.schema';

export type DatasetDocument = HydratedDocument<Model>;

@Schema()
export class Dataset {
  @Prop({ type: [RecordSchema], ref: Record.name })
  records: Record[];
}
export const DatasetSchema = SchemaFactory.createForClass(Dataset);
