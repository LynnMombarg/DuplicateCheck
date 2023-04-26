import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthDAO {
  getUserId(token: string): string {
    return 'test123';
  }
}
