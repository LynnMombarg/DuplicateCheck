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

  storeToken(id: string, access: string, refresh: string, jwt: string): void {
    this.authModel
      .findOne({ userId: id })
      .exec()
      .then((doc) => {
        if (doc) {
          doc.accessToken = access;
          doc.refreshToken = refresh;
          doc.jwtToken = jwt;
          doc.save();
        } else {
          const auth = new this.authModel({
            userId: id,
            accessToken: access,
            refreshToken: refresh,
            jwtToken: jwt,
          });
          auth.save();
        }
      });
  }

  updateToken(access: string): void {
    this.authModel
      .findOne({ accessToken: access })
      .exec()
      .then((doc) => {
        if (doc) {
          doc.accessToken = access;
          doc.save();
        }
      });
  }

  removeTokens(id: string): void {
    this.authModel.deleteOne({ userId: id }).exec();
  }

  async getTokensByUserId(id: string): Promise<AuthDTO> {
    return await this.authModel
      .findOne({ userId: id })
      .exec()
      .then((doc) => {
        return new AuthDTO(doc.userId, doc.accessToken, doc.refreshToken);
      })
      .catch((err) => {
        throw new UnauthorizedException();
      });
  }

  blackListToken(id: string, jwt: string) {
    const authBlacklist = new this.authBlacklistModel({
      userId: id,
      jwtToken: jwt,
    });
    authBlacklist.save();
  }

  isBlacklisted(id: string, jwt: string) {
    return this.authBlacklistModel
      .findOne({ userId: id, jwtToken: jwt })
      .exec()
      .then((doc) => {
        return !!doc;
      });
  }

  removeBlacklistedToken(id: string) {
    this.authBlacklistModel.deleteOne({ userId: id }).exec();
  }
}
