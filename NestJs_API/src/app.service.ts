import { Injectable } from '@nestjs/common';
import { MessageDTO } from "./dto/message.dto";
import { json } from "express";

@Injectable()
export class AppService {
  getHello(): MessageDTO {
    return new MessageDTO("Hello World!");
  }
}
