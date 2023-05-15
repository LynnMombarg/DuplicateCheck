// Authors: Roward
// Jira-task: 115 - Jobs ophalen van Salesforce in NestJS
// Sprint: 3
// Last modified: 15-05-2023

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from 'src/auth/auth.dto';
import { AuthService } from '../auth/auth.service';
import { JobDTO } from '../model/dto/job-model.dto';

@Injectable()
export class SalesforceDAO {
  constructor(private readonly authService: AuthService) {}

  jsforce = require('jsforce');
  oauth2 = new this.jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
    redirectUri: process.env.BASE_URL + '/auth/callback',
  });

  async getJobs(tableId: string, tokens: AuthDTO): Promise<JobDTO[]> {
    if (tableId == 'error') {
      throw new NotFoundException();
    }
    const resultSet: JobDTO[] = [];

    await new Promise((resolve, reject) => {
      const conn = new this.jsforce.Connection({
        oauth2: this.oauth2,
        instanceUrl: process.env.SF_INSTANCE_URL,
        accessToken: tokens.getAccessToken(),
        refreshToken: tokens.getRefreshToken(),
      });
      conn.on(
        'refresh',
        function (accessToken, res) {
          console.log('refreshed token: ' + accessToken);
          this.authService.updateToken(accessToken);
        }.bind(this),
      );
      conn.query(
        "SELECT id, name FROM dupcheck__dcJob__c WHERE dupcheck__SourceObject__c = '" +
          tableId +
          "'",
        (err, result) => {
          if (err) {
            console.log(err); 
            reject(new UnauthorizedException());
          } else {
            for (let i = 0; i < result.records.length; i++) {
              const jobName = result.records[i]['Name'];
              const jobId = result.records[i]['Id'];
              resultSet.push(new JobDTO(jobName, jobId));
            }
            resolve(resultSet);
          }
        },
      );
    });
    return resultSet;
  }
}
