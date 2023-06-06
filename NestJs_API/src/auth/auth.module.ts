/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthDAO } from './auth.dao';
import {
  Auth,
  AuthBlacklist,
  AuthBlacklistSchema,
  AuthSchema,
} from './schema/auth.schema';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';
import { SalesforceModule } from '../salesforce/salesforce.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: AuthBlacklist.name, schema: AuthBlacklistSchema },
    ]),
    JwtModule.register(jwtConfig),
    SalesforceModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthDAO, AuthGuard],
  exports: [AuthService, AuthDAO, AuthGuard],
})
export class AuthModule {}
