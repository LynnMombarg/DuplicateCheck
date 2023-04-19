import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Message, MessageSchema } from './dto/message.schema';
import { ItemModule } from './item/item.module';
import { LoginModule } from './login/login.module';
import { PythonModule } from './python/python.module';

@Module({
  imports: [
      MongooseModule.forRoot(
      'mongodb+srv://pascal:ditIsEenLeukProject23@mar.jbpp1g5.mongodb.net/DuplicateCheck',
  ),
    MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
    ItemModule,
    LoginModule,
      PythonModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
