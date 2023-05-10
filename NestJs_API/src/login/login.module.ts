import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthDAO } from './auth.dao';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, AuthDAO],
  exports: [AuthDAO],
})
export class LoginModule {}
