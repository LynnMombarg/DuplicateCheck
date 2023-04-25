import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type modeldocument = HydratedDocument<model>;

@Schema()
export class model {
  @Prop()
  modelid: string;
}

export const modeldocument = SchemaFactory.createForClass(model);
