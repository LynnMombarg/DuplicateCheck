/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthBlacklist } from './schema/auth.schema';
import mongoose from 'mongoose';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthDAO {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(AuthBlacklist.name)
    private authBlacklistModel: mongoose.Model<AuthBlacklist>,
  ) {}

  storeToken(
    userID: string,
    accessToken: string,
    refresh_token: string,
    jwtToken: string,
  ): void {
    console.log('Storing token');
    this.authModel
      .findOne({ userId: userID })
      .exec()
      .then((doc) => {
        if (doc) {
          doc.accessToken = accessToken;
          doc.refreshToken = refresh_token;
          doc.jwtToken = jwtToken;
          doc.save();
        } else {
          const auth = new this.authModel({
            userId: userID,
            accessToken: accessToken,
            refreshToken: refresh_token,
            jwtToken: jwtToken,
          });
          auth.save();
        }
      });
  }

  updateToken(accessToken: string): void {
    this.authModel
      .findOne({ accessToken: accessToken })
      .exec()
      .then((doc) => {
        if (doc) {
          doc.accessToken = accessToken;
          doc.save();
        }
      });
  }

  removeTokens(userId: string): void {
    this.authModel.deleteOne({ userId: userId }).exec();
  }

  async getTokensByUserId(userId: string): Promise<AuthDTO> {
    return await this.authModel
      .findOne({ userId: userId })
      .exec()
      .then((doc) => {
        return new AuthDTO(doc.userId, doc.accessToken, doc.refreshToken);
      })
      .catch((err) => {
        throw new UnauthorizedException();
      });
  }

  getUserId(token: string): string {
    return 'test123';
  }

  blackListToken(userId: string, jwtToken: string) {
    const authBlacklist = new this.authBlacklistModel({
      userId: userId,
      jwtToken: jwtToken,
    });
    authBlacklist.save();
  }

  isBlacklisted(userId: string, jwtToken: string) {
    return this.authBlacklistModel
      .findOne({ userId: userId, jwtToken: jwtToken })
      .exec()
      .then((doc) => {
        return !!doc;
      });
  }

  removeBlacklistedToken(userId: string) {
    this.authBlacklistModel.deleteOne({ userId: userId }).exec();
  }
}
