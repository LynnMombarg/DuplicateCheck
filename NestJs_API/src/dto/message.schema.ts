import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
