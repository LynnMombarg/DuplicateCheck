/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

import { Injectable } from '@nestjs/common';
import { AuthDAO } from './auth.dao';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authDAO: AuthDAO) {}

  login(
    userID: string,
    accessToken: string,
    refresh_token: string,
    jwtToken: string,
  ): void {
    this.authDAO.storeToken(userID, accessToken, refresh_token, jwtToken);
  }

  updateToken(accessToken: string): void {
    this.authDAO.updateToken(accessToken);
  }

  logout(userId: string): void {
    this.authDAO.removeTokens(userId);
  }

  async getTokensByUserId(userId: string): Promise<AuthDTO> {
    return await this.authDAO.getTokensByUserId(userId);
  }
}
