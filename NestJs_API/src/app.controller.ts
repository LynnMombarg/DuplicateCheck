import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PythonService } from './python/python.service';
import { MessageDTO } from './dto/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): Promise<MessageDTO> {
  //   return this.appService.getHello();
  // }

  @Get()
  getDashboard(@Query('accessToken') token: string): string {
    return token;
  }
}
