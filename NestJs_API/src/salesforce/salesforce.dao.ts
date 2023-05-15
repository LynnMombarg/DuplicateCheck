// Authors: Roward, Marloes
// Jira-task: 115, 130
// Sprint: 3
// Last modified: 15-05-2023

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from 'src/auth/auth.dto';
import { AuthService } from '../auth/auth.service';
import { JobDTO } from '../model/dto/job-model.dto';
import { RecordDTO } from '../training/dto/record.dto';
import { DatasetDTO } from '../training/dto/dataset.dto';

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

  async getDatasets(
    tokens: AuthDTO,
    jobId: string,
    tableName: string,
  ): Promise<DatasetDTO[]> {
    let columns = '';
    switch (tableName) {
      case 'leads':
        columns = 'Name, Title, Company, Phone, MobilePhone, Email, Status';
        break;
      case 'contacts':
        columns = 'Name, Account.Name, Account.Site, Phone, Email';
        break;
      case 'accounts':
        columns = 'Name, Site, Phone';
        break;
      default:
        throw new BadRequestException();
        break;
    }
    const resultSet: DatasetDTO[] = [];

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
        "SELECT id, " + columns + " FROM " + tableName + " WHERE EXISTS = '" +
          jobId +
          "'",

          //SELECT dupcheck__SourceObject__c, dupcheck__Group__c FROM dupcheck__dc3Duplicate__c D WHERE dupcheck__Group__c IN (SELECT G.Id FROM dupcheck__dcGroup__c G WHERE G.dupcheck__dcJob__c = 'a0C7Q00000Cz26UUAR')
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
