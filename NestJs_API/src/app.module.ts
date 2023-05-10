import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login/login.module';
import { ModelModule } from './model/model.module';

@Module({
  // 'mongodb+srv://pascal:ditIsEenLeukProject23@mar.jbpp1g5.mongodb.net/DuplicateCheck',
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/DuplicateCheck',
    ),
    LoginModule,
    ModelModule,
  ],
})
export class AppModule {}
