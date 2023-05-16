/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 11-05-2023
 */

import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { jwtConfig } from '../config/jwt.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: 'src/config/env/' + process.env.NODE_ENV + '.env',
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsforce = require('jsforce');
const oauth2 = new jsforce.OAuth2({
  loginUrl: 'https://login.salesforce.com',
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: process.env.BASE_URL + '/auth/callback',
});
const clientId = process.env.SF_CLIENT_ID;

/**
 * Login Controller
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

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
    console.log(process.env);
    console.log(clientId);
  }

  /**
   * Callback from Salesforce login page
   * @param code - Authorization code
   * @param res - Response
   * Redirect to dashboard
   */
  @Get('/callback')
  callback(@Query('code') code: string, @Res() res): void {
    const conn = new jsforce.Connection({ oauth2: oauth2 });
    conn.authorize(
      code,
      async function (err, userInfo) {
        if (err) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'unauthorized',
          });
        }
        console.log('conn.accessToken: ' + conn.accessToken);
        console.log('conn.refreshToken: ' + conn.refreshToken);
        const jwtToken = await this.jwtService.signAsync(
          {
            userId: userInfo.id,
          },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        );
        this.authService.login(
          userInfo.id,
          conn.accessToken,
          conn.refreshToken,
          jwtToken,
        );
        let displayName;
        let email;
        await conn.identity(function (err, res) {
          if (err) {
            return console.error(err);
          }
          displayName = res.display_name;
          email = res.username;
        });
        const json = JSON.stringify({
          message: 'success',
          token: jwtToken,
          user: {
            username: displayName,
            email: email,
          },
        });
        const script =
          '<script>window.opener.postMessage(' +
          json +
          ", 'http://localhost:8002')</script>";
        return res.status(HttpStatus.OK).send(script);
      }.bind(this),
    );
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req): Promise<void> {
    console.log('logout');

    const authDTO = await this.authService.getTokensByUserId(req.user.userId);
    const conn = new jsforce.Connection({
      oauth2: oauth2,
      instanceUrl: process.env.SF_INSTANCE_URL,
      accessToken: authDTO.getAccessToken(),
      refreshToken: authDTO.getRefreshToken(),
    });
    conn.on(
      'refresh',
      function (accessToken, res) {
        console.log('refreshed token: ' + accessToken);
        this.authService.updateToken(accessToken);
      }.bind(this),
    );

    conn.logout(function (err) {
      if (err) {
        return console.error('Error logging out: ' + err);
      }
      console.log('Logged out');
    });
    this.authService.logout(authDTO.userId);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test(@Req() req): Promise<void> {
    console.log(req.user.userId);

    const authDTO = await this.authService.getTokensByUserId(req.user.userId);
    const conn = new jsforce.Connection({
      oauth2: oauth2,
      instanceUrl: process.env.SF_INSTANCE_URL,
      accessToken: authDTO.getAccessToken(),
      refreshToken: authDTO.getRefreshToken(),
    });
    conn.on(
      'refresh',
      function (accessToken, res) {
        console.log('refreshed token: ' + accessToken);
        this.authService.updateToken(accessToken);
      }.bind(this),
    );

    conn.query('SELECT id FROM dupcheck__dcJob__c', function (err, result) {
      if (err) {
        return console.error(err);
      }
      console.log('total : ' + result.totalSize);
      console.log('fetched : ' + result.records.length);
    });
  }
}
