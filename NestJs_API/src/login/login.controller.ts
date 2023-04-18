import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsforce = require('jsforce');

const oauth2 = new jsforce.OAuth2({
  loginUrl: 'https://login.salesforce.com',
  clientId:
    '3MVG9t0sl2P.pBypwV3MuOdoedKkrAz3QadRz9KQA9QqULV2_RvPCymX_8b1bIQibJwp_oiD9Qo9lotYoZMbu',
  clientSecret:
    'CBA2D84D666983F2B1A3AF324CC894155F6A22FD561B1D33BFE663FEC7EE5347',
  redirectUri: 'http://localhost:3000/auth/callback',
});

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Redirect(
    oauth2.getAuthorizationUrl({ scope: 'full', response_type: 'code' }),
  )
  @Get('/login')
  login(): void {
    console.log('login');
  }

  @Get('/callback')
  callback(@Query('code') code: string, @Res() res): void {
    const conn = new jsforce.Connection({ oauth2: oauth2 });
    let userID;
    let accessToken;
    conn.authorize(code, function (err, userInfo) {
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }
      console.log('conn.accessToken: ' + conn.accessToken);
      console.log('conn.instanceUrl: ' + conn.instanceUrl);
      console.log('User ID: ' + userInfo.id);
      console.log('Org ID: ' + userInfo.organizationId);
      userID = userInfo.id;
      accessToken = conn.accessToken;
      return res.redirect(
        'http://localhost:3000/?accessToken=' + conn.accessToken,
      );
    });
    this.loginService.addAccessTokenToUser(userID, accessToken);
  }
}
