import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './dto/message.schema';
import { LoginModule } from './login/login.module';
import { ModelModule } from './model/model.module';

@Module({
  // 'mongodb+srv://pascal:ditIsEenLeukProject23@mar.jbpp1g5.mongodb.net/DuplicateCheck',
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/DuplicateCheck',
    ),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ItemModule,
    LoginModule,
    ModelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
