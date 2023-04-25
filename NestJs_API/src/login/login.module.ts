import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AuthDao } from './auth.dao';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, AuthDao],
  exports: [AuthDao],
})
export class LoginModule {}
