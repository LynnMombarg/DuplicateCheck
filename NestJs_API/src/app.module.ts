import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './dto/message.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pascal:ditIsEenLeukProject23@mar.jbpp1g5.mongodb.net/DuplicateCheck',
    ),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
