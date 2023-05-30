/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop()
  orgId: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop()
  jwtToken: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

export type AuthBlacklistDocument = HydratedDocument<AuthBlacklist>;

@Schema()
export class AuthBlacklist {
  @Prop()
  userId: string;

  @Prop()
  jwtToken: string;
}

export const AuthBlacklistSchema = SchemaFactory.createForClass(AuthBlacklist);
