import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './dto/message.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  // 'mongodb+srv://pascal:ditIsEenLeukProject23@mar.jbpp1g5.mongodb.net/DuplicateCheck',
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/DuplicateCheck',
    ),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ItemModule,
    AuthModule,
  ],
})
export class AppModule {}
