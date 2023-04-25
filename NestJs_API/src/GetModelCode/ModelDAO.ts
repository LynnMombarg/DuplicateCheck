import { Injectable } from '@nestjs/common';
import { models } from 'mongoose';

@Injectable()
export class ModelDAO {
  private MessageDTO: Array<string>;

  getAllModels(): Array<string> {
    // code to get all models from mongoDB
    return this.MessageDTO;
  }

  static getAllModels() {
    // code to get all models from mongoDB
  }
}
