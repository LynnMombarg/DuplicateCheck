import { Injectable } from '@nestjs/common';
import { AuthDAO } from '../auth/auth.dao';

@Injectable()
export class LoginService {
  constructor(private readonly authDAO: AuthDAO) {}

  storeToken(userID: string, accessToken: string, refresh_token: string): void {
    this.authDAO.storeToken(userID, accessToken, refresh_token);
  }
}
