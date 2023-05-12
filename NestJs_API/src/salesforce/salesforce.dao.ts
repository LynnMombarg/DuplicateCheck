// Authors: Roward
// Jira-task: 115 - Jobs ophalen van Salesforce in NestJS
// Sprint: 3
// Last modified: 12-05-2023

import { Injectable } from '@nestjs/common';
import { AuthDTO } from 'src/auth/auth.dto';
import { JobDTO } from 'src/model/dto/job-model.dto';

const jsforce = require('jsforce');
const oauth2 = new jsforce.OAuth2({
  loginUrl: 'https://login.salesforce.com',
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: process.env.BASE_URL + '/auth/callback',
});

@Injectable()
export class SalesforceDAO {
  async getJobs(tableName: String, tokens: AuthDTO): Promise<JobDTO[]> {
    let resultSet = [];
    const conn = new jsforce.Connection({
      oauth2: oauth2,
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

    conn.query('SELECT id, name FROM dupcheck__dcJob__c', function (err, result) {
      if (err) {
        return console.error(err);
      }
      for (var i = 0; i < result.records.length; i++) {
        let jobName = result.records[i]["Name"];
        let jobId = result.records[i]["Id"];
        resultSet.push(new JobDTO(jobName, jobId));
      }
    });
    return resultSet;
  }
}
