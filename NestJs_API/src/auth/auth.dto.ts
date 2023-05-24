/**
 * Author(s): Diederik Lensink
 * Jira-task: 102 - NestJS oauth2 token opslaan, 103 - NestJS oauth2 token afhandelen
 * Sprint: 2
 * Last modified: 08-05-2023
 */

export class AuthDTO {
  constructor(orgId: string, accessToken: string, refreshToken: string) {
    this.orgId = orgId;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  orgId: string;
  accessToken: string;
  refreshToken: string;

  getOrgId(): string {
    return this.orgId;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }
}
