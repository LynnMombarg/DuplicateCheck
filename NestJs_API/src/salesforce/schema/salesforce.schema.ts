// Authors: Marloes
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FieldsDocument = HydratedDocument<Fields>;

@Schema()
export class Fields {
  @Prop()
  orgId: string;

  @Prop()
  lead: string[];

  @Prop()
  contact: string[];

  @Prop()
  account: string[];
}

export const FieldsSchema = SchemaFactory.createForClass(Fields);
