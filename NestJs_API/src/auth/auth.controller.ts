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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import * as jsforce from 'jsforce';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `src/config/env/${process.env.NODE_ENV}.env`,
});
const auth = new jsforce.OAuth2({
  loginUrl: 'https://login.salesforce.com',
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: `${process.env.BASE_URL}/auth/callback`,
});

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
    auth.getAuthorizationUrl({
      scope: 'api id refresh_token',
      response_type: 'code',
    }),
  )
  @Get('/login')
  login(): void {}

  /**
   * Callback from Salesforce login page
   * @param code - Authorization code
   * @param res - Response
   * Redirect to dashboard
   */
  @Get('/callback')
  callback(@Query('code') code: string, @Res() res): void {
    const conn = new jsforce.Connection({ oauth2: auth });
    conn.authorize(
      code,
      async function (err, userInfo) {
        if (err) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'unauthorized',
          });
        }
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
        let mail;
        await conn.identity(function (err, res) {
          try {
            if (err) {
              throw UnauthorizedException;
            }
          } catch {}
          displayName = res.display_name;
          mail = res.username;
        });
        const json = JSON.stringify({
          message: 'success',
          token: jwtToken,
          user: {
            username: displayName,
            email: mail,
          },
        });
        const script = `<script>window.opener.postMessage(${json}, 'http://localhost:8002')</script>`;
        return res.status(HttpStatus.OK).send(script);
      }.bind(this),
    );
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Req() req): Promise<void> {
    const authDTO = await this.authService.getTokensByUserId(req.user.userId);
    const conn = new jsforce.Connection({
      oauth2: auth,
      instanceUrl: process.env.SF_INSTANCE_URL,
      accessToken: authDTO.getAccessToken(),
      refreshToken: authDTO.getRefreshToken(),
    });
    conn.on(
      'refresh',
      function (accessToken) {
        this.authService.updateToken(accessToken);
      }.bind(this),
    );

    conn.logout(function (err) {
      try {
        if (err) {
          throw UnauthorizedException;
        }
      } catch {}
    });
    this.authService.logout(authDTO.userId);
  }
}
