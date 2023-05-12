/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthDAO } from './auth.dao';
import { Auth, AuthSchema } from './auth.schema';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthDAO, AuthGuard, AuthService],
  exports: [AuthGuard, AuthDAO],
})
export class AuthModule {}
