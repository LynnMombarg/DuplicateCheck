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
let conn;

const oauth2 = new jsforce.OAuth2({
  loginUrl: 'https://login.salesforce.com',
  clientId:
    '3MVG9t0sl2P.pBypwV3MuOdoedKkrAz3QadRz9KQA9QqULV2_RvPCymX_8b1bIQibJwp_oiD9Qo9lotYoZMbu',
  clientSecret:
    'CBA2D84D666983F2B1A3AF324CC894155F6A22FD561B1D33BFE663FEC7EE5347',
  redirectUri: 'http://localhost:8001/auth/callback',
});

/**
 * Login Controller
 */
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * Login
   * Redirect to Salesforce login page
   */
  @Redirect(
    oauth2.getAuthorizationUrl({
      scope: 'full refresh_token',
      response_type: 'code',
    }),
  )
  @Get('/login')
  login(): void {
    console.log('login');
  }

  /**
   * Callback from Salesforce login page
   * @param code - Authorization code
   * @param res - Response
   * Redirect to dashboard
   */
  @Get('/callback')
  callback(@Query('code') code: string, @Res() res): void {
    conn = new jsforce.Connection({ oauth2: oauth2 });
    let userID;
    let accessToken;
    let refreshToken;
    conn.authorize(code, function (err, userInfo) {
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }
      console.log('conn.accessToken: ' + conn.accessToken);
      console.log('conn.refreshToken: ' + conn.refreshToken);
      console.log('conn.instanceUrl: ' + conn.instanceUrl);
      console.log('User ID: ' + userInfo.id);
      console.log('Org ID: ' + userInfo.organizationId);
      userID = userInfo.id;
      accessToken = conn.accessToken;
      refreshToken = conn.refreshToken;
      return res.redirect(
        'http://localhost:8001/?accessToken=' + conn.accessToken,
      );
    });
    this.loginService.storeToken(userID, accessToken, refreshToken);
  }

  @Get('test')
  test(): void {
    conn.query('SELECT id FROM dupcheck__dcJob__c', function (err, result) {
      if (err) {
        return console.error(err);
      }
      console.log('total : ' + result.totalSize);
      console.log('fetched : ' + result.records.length);
    });
  }
}
