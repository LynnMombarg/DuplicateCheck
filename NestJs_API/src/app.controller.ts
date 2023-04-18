import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDTO } from './dto/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<MessageDTO> {
    return this.appService.getHello();
  }
}
