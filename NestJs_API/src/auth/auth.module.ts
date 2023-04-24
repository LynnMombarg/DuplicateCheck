import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthDAO } from './auth.dao';
import { Auth, AuthSchema } from './auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [],
  providers: [AuthDAO],
  exports: [AuthDAO],
})
export class AuthModule {}
