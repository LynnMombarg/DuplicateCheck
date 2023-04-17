import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop()
  modelId: number;

  @Prop()
  orgId: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
