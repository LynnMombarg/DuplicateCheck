import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import mongoose from 'mongoose';

@Injectable()
export class AuthDAO {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
  ) {}

  storeToken(userID: string, accessToken: string, refresh_token: string): void {
    console.log('Storing token');
    this.authModel
      .findOne({ userId: userID })
      .exec()
      .then((doc) => {
        if (doc) {
          doc.accessToken = accessToken;
          doc.refreshToken = refresh_token;
          doc.save();
          return;
        } else {
          const auth = new this.authModel({
            userId: userID,
            accessToken: accessToken,
            refreshToken: refresh_token,
          });
          auth.save();
        }
      });
  }

  removeToken(accessToken: string): void {
    this.authModel.deleteOne({ accessToken: accessToken }).exec();
  }

  async getAccessToken(userID: string): Promise<string> {
    return await this.authModel
      .findOne({ userId: userID })
      .exec()
      .then((doc) => {
        return doc.accessToken;
      });
  }

  async getRefreshToken(userID: string): Promise<string> {
    return await this.authModel
      .findOne({ userId: userID })
      .exec()
      .then((doc) => {
        return doc.refreshToken;
      });
  }

  async getUserId(accessToken: string): Promise<string> {
    return await this.authModel
      .findOne({ accessToken: accessToken })
      .exec()
      .then((doc) => {
        return doc.userId;
      });
  }
}
