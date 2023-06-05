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
      .findOne({ orgId: id })
      .exec()
      .then((doc) => {
        if (doc) {
          doc.accessToken = access;
          doc.refreshToken = refresh;
          doc.jwtToken = jwt;
          this.authModel.create(doc);
        } else {
          const auth = new this.authModel({
            orgId: id,
            accessToken: access,
            refreshToken: refresh,
            jwtToken: jwt,
          });
          this.authModel.create(auth);
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
          this.authModel.create(doc);
        }
      });
  }

  removeTokens(id: string): void {
    this.authModel.deleteOne({ orgId: id }).exec();
  }

  getTokensByOrgId(id: string): Promise<AuthDTO> {
    return this.authModel
      .findOne({ orgId: id })
      .exec()
      .then((doc) => {
        return new AuthDTO(doc.orgId, doc.accessToken, doc.refreshToken);
      })
      .catch((err) => {
        throw new UnauthorizedException();
      });
  }

  blackListToken(id: string, jwt: string) {
    this.authBlacklistModel.create({ orgId: id, jwtToken: jwt });
  }

  isBlacklisted(id: string, jwt: string) {
    return this.authBlacklistModel
      .findOne({ orgId: id, jwtToken: jwt })
      .exec()
      .then((doc) => {
        return !!doc;
      });
  }

  removeBlacklistedToken(id: string) {
    this.authBlacklistModel.deleteOne({ orgId: id }).exec();
  }
}
