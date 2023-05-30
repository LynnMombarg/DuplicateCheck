/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

import { Injectable } from '@nestjs/common';
import { AuthDAO } from './auth.dao';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authDAO: AuthDAO) {}

  login(
    orgId: string,
    accessToken: string,
    refreshToken: string,
    jwtToken: string,
  ): void {
    this.authDAO.storeToken(orgId, accessToken, refreshToken, jwtToken);
    this.removeBlacklistedToken(orgId);
  }

  updateToken(accessToken: string): void {
    this.authDAO.updateToken(accessToken);
  }

  logout(orgId: string): void {
    this.authDAO.removeTokens(orgId);
  }

  async getTokensByOrgId(orgId: string): Promise<AuthDTO> {
    return this.authDAO.getTokensByOrgId(orgId);
  }

  blackListToken(orgId: string, jwtToken: string): void {
    this.authDAO.blackListToken(orgId, jwtToken);
  }

  async isBlacklisted(orgId: string, jwtToken: string): Promise<boolean> {
    return this.authDAO.isBlacklisted(orgId, jwtToken);
  }

  removeBlacklistedToken(orgId: string): void {
    this.authDAO.removeBlacklistedToken(orgId);
  }
}
