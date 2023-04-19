import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  addAccessTokenToUser(userID: any, accessToken: string): void {
    console.log('userID: ' + userID);
    console.log('accessToken: ' + accessToken);
  }
}
