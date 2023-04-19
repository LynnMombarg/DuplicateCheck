import { Injectable } from '@nestjs/common';
import { MessageDTO } from './dto/message.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Message } from './dto/message.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Message.name) private messageModel: mongoose.Model<Message>,
  ) {}

  async getHello(): Promise<MessageDTO> {
    return await this.messageModel.findOne({ messageId: 1 }).exec();
  }
}
