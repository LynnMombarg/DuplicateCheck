import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Headers } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsforce = require('jsforce');
let conn;

const oauth2 = new jsforce.OAuth2({
  loginUrl: 'https://login.salesforce.com',
  clientId:
    '3MVG9t0sl2P.pBypwV3MuOdoedKkrAz3QadRz9KQA9QqULV2_RvPCymX_8b1bIQibJwp_oiD9Qo9lotYoZMbu',
  clientSecret:
    'CBA2D84D666983F2B1A3AF324CC894155F6A22FD561B1D33BFE663FEC7EE5347',
  redirectUri: process.env.BASE_URL + '/auth/callback',
});

/**
 * Login Controller
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: AuthService) {}

  /**
   * Login
   * Redirect to Salesforce login page
   */
  @Redirect(
    oauth2.getAuthorizationUrl({
      scope: 'api id refresh_token',
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
    const loginService = this.loginService;
    conn = new jsforce.Connection({ oauth2: oauth2 });
    conn.authorize(code, function (err, userInfo) {
      if (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'unauthorized',
        });
      }
      console.log('conn.accessToken: ' + conn.accessToken);
      console.log('conn.refreshToken: ' + conn.refreshToken);
      console.log('conn.instanceUrl: ' + conn.instanceUrl);
      console.log('User ID: ' + userInfo.id);
      console.log('Org ID: ' + userInfo.organizationId);
      loginService.login(userInfo.id, conn.accessToken, conn.refreshToken);
      const script =
        "<script>window.opener.postMessage({ message: 'success', token: '" +
        conn.accessToken +
        "' }, 'http://localhost:8002')</script>";
      return res.status(HttpStatus.OK).send(script);
    });
  }

  @Post('logout')
  logout(@Headers('Authorization') accessToken: string): void {
    console.log('logout');
    this.loginService.logout(accessToken);
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
