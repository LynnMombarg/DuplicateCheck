/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthBlacklist } from './auth.schema';
import mongoose from 'mongoose';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthDAO {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    @InjectModel(AuthBlacklist.name)
    private authBlacklistModel: mongoose.Model<AuthBlacklist>,
  ) {}

  storeToken(
    orgId: string,
    accessToken: string,
    refresh_token: string,
    jwtToken: string,
  ): void {
    console.log('Storing token');
    console.log(orgId);
    this.authModel
      .findOne({ orgId: orgId })
      .exec()
      .then((doc) => {
        if (doc) {
          doc.accessToken = accessToken;
          doc.refreshToken = refresh_token;
          doc.jwtToken = jwtToken;
          doc.save();
        } else {
          const auth = new this.authModel({
            orgId: orgId,
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

  removeTokens(orgId: string): void {
    this.authModel.deleteOne({ orgId: orgId }).exec();
  }

  async getTokensByOrgId(orgId: string): Promise<AuthDTO> {
    return await this.authModel
      .findOne({ orgId: orgId })
      .exec()
      .then((doc) => {
        return new AuthDTO(doc.orgId, doc.accessToken, doc.refreshToken);
      })
      .catch((err) => {
        throw new UnauthorizedException();
      });
  }

  blackListToken(orgId: string, jwtToken: string) {
    const authBlacklist = new this.authBlacklistModel({
      orgId: orgId,
      jwtToken: jwtToken,
    });
    authBlacklist.save();
  }

  isBlacklisted(orgId: string, jwtToken: string) {
    return this.authBlacklistModel
      .findOne({ orgId: orgId, jwtToken: jwtToken })
      .exec()
      .then((doc) => {
        return !!doc;
      });
  }

  removeBlacklistedToken(orgId: string) {
    this.authBlacklistModel.deleteOne({ orgId: orgId }).exec();
  }
}
