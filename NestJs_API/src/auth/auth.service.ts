import { Injectable } from '@nestjs/common';
import { AuthDAO } from '../auth/auth.dao';

@Injectable()
export class AuthService {
  constructor(private readonly authDAO: AuthDAO) {}

  login(userID: string, accessToken: string, refresh_token: string): void {
    this.authDAO.storeToken(userID, accessToken, refresh_token);
  }

  logout(accessToken: string): void {
    this.authDAO.removeToken(accessToken);
  }
}
