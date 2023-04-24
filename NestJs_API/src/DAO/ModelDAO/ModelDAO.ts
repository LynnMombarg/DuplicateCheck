import { Injectable } from '@nestjs/common';
import { models } from 'mongoose';

@Injectable()
export class ModelDAO {
  private MessageDTO: Array<string>;

  getAllModels(): Array<string> {
    return this.MessageDTO;
    // code to get all models from mongoDB
  }
}
