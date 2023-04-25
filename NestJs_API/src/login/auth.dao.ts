import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthDao {
  getUserId(token: string): string {
    return 'test123';
  }
}
