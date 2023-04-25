import { Injectable } from '@nestjs/common';
import { Connection, models } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class ModelDAO {
  private MessageDTO: Array<string>;
  constructor(@InjectConnection() private connection: Connection) {}

  getAllModels(): Array<string> {
    // code to get all models from mongoDB
    return this.MessageDTO;
  }

  getModel(): Array<string> {
    // code to get a specific model from mongoDB
    return this.MessageDTO;
  }
}
