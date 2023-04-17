import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop()
  modelId: string;

  @Prop()
  orgId: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
