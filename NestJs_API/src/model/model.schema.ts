import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ModelDocument = HydratedDocument<Model>;

@Schema()
export class Model {
  @Prop()
  modelName: string;

  @Prop()
  fileName: string;

  @Prop()
  tableName: string;

  @Prop()
  userId: string;
}

export const ModelSchema = SchemaFactory.createForClass(Model);
