// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Model } from '../../model/schema/model.schema';

export type RecordDocument = HydratedDocument<Model>;

@Schema()
export class Record {
  @Prop()
  data: string[];
}
export const RecordSchema = SchemaFactory.createForClass(Record);
