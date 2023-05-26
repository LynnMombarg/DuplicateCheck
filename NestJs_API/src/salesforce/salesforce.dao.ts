// Authors: Roward, Marloes
// Jira-task: 115, 130, 141, 175
// Sprint: 3, 4
// Last modified: 26-05-2023

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { AuthService } from '../auth/auth.service';
import { JobDTO } from '../model/dto/job-model.dto';
import { RecordDTO } from '../training/dto/record.dto';
import { DatasetDTO } from '../training/dto/dataset.dto';
import { response } from 'express';

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

  async getFields(tableName: string, tokens: AuthDTO): Promise<string[]> {
    try {
      const resultSet: string[] = [];
      const jobId = await this.getJobId(tokens);
      console.log(jobId);
      await new Promise(async (resolve, reject) => {
        const interval = setInterval(async () => {
          if (await this.getStatusOfDownload(jobId, tokens)) {
            clearInterval(interval);
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
            await conn.apex.post(
              '/services/apexrest/dupcheck/dc3Api/admin/export-config-download',
              { jobId: jobId },
              (err, res) => {
                if (err) {
                  console.error(err);
                }
                const jsonConfig = JSON.parse(res);
                for (let i = 0; i < 3; i++) {
                  const tableObject = jsonConfig['objects'][i];
                  if (
                    tableObject['crossObjects'][0][
                      'objectFrom'
                    ].toLowerCase() == tableName
                  ) {
                    for (
                      let j = 0;
                      j < tableObject['resultFields'].length;
                      j++
                    ) {
                      resultSet.push(tableObject['resultFields'][j]['field']);
                    }
                  }
                }
                resolve(resultSet);
              },
            );
            return resultSet;
          }
        }, 200);
      });
      return resultSet;
    } catch (err) {
      console.error('An error occurred:', err);
    }
  }

  async getStatusOfDownload(jobId: String, tokens: AuthDTO): Promise<boolean> {
    let status = false;
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
      conn.apex.post(
        '/services/apexrest/dupcheck/dc3Api/admin/export-config-download',
        { jobId: jobId },
        (err, res) => {
          if (err) {
            console.error(err);
          }
          status = res['ok'] == null;
          resolve(status);
        },
      );
    });
    return status;
  }

  async getJobId(tokens: AuthDTO): Promise<string> {
    let jobId = '';
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
      conn.apex.post(
        '/services/apexrest/dupcheck/dc3Api/admin/export-config',
        {},
        (err, res) => {
          if (err) {
            console.error(err);
          }
          jobId = res['jobId'];
          resolve(jobId);
        },
      );
    });
    return jobId;
  }

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
    fields: string[],
    tableName: string,
  ): Promise<DatasetDTO[]> {
    let columns = '';
    for (let i = 0; i < fields.length; i++) {
      columns += fields[i] + ',';
    }
    columns = columns.slice(0, -1);
    console.log(columns);
    const resultSet: DatasetDTO[] = [];

    const [sourceIndexes, matchIndexes] = await this.getIndexes(jobId, tokens);
    if (sourceIndexes == '' || matchIndexes == '') {
      throw new NotFoundException();
    }
    const datasetA = new DatasetDTO(
      await this.getSourceRecords(columns, tableName, sourceIndexes, tokens),
    );
    const datasetB = new DatasetDTO(
      await this.getMatchRecords(columns, tableName, matchIndexes, tokens),
    );
    resultSet.push(datasetA);
    resultSet.push(datasetB);
    return resultSet;
  }

  async getIndexes(jobId: string, tokens: AuthDTO): Promise<[string, string]> {
    let matchIndexes = '';
    let sourceIndexes = '';
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
        "SELECT dupcheck__SourceObject__c, dupcheck__MatchObject__c FROM dupcheck__dc3Duplicate__c D WHERE dupcheck__dcGroup__c IN (SELECT Id FROM dupcheck__dcGroup__c G WHERE dupcheck__dcJob__c = '" +
          jobId +
          "')",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(new UnauthorizedException());
          } else {
            for (let i = 0; i < result.records.length; i++) {
              const matchIndex = result.records[i]['dupcheck__MatchObject__c'];
              const sourceIndex =
                result.records[i]['dupcheck__SourceObject__c'];
              matchIndexes += "'" + matchIndex + "',";
              sourceIndexes += "'" + sourceIndex + "',";
            }
            resolve([matchIndexes, sourceIndexes]);
          }
        },
      );
    });
    matchIndexes = matchIndexes.slice(0, -1);
    sourceIndexes = sourceIndexes.slice(0, -1);
    return [sourceIndexes, matchIndexes];
  }

  async getSourceRecords(
    columns: string,
    tableName: string,
    sourceIndexes: string,
    tokens: AuthDTO,
  ): Promise<RecordDTO[]> {
    const resultSet: RecordDTO[] = [];

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
      try {
        conn.query(
          'SELECT ' +
            columns +
            ' FROM ' +
            tableName +
            ' WHERE Id IN (' +
            sourceIndexes +
            ')',
          (err, result) => {
            if (err) {
              console.log(err.message);
              throw new BadRequestException();
            } else {
              for (let i = 0; i < result.records.length; i++) {
                const record = result.records[i];
                resultSet.push(new RecordDTO(record));
              }
              resolve(resultSet);
            }
          },
        );
      } catch (err) {
        console.error(err.message);
        throw new BadRequestException(err.message);
      }
    });
    return resultSet;
  }

  async getMatchRecords(
    columns: string,
    tableName: string,
    matchIndexes: string,
    tokens: AuthDTO,
  ): Promise<RecordDTO[]> {
    const resultSet: RecordDTO[] = [];

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
        'SELECT ' +
          columns +
          ' FROM ' +
          tableName +
          ' WHERE Id IN (' +
          matchIndexes +
          ')',
        (err, result) => {
          if (err) {
            console.log(err);
            reject(new UnauthorizedException());
          } else {
            for (let i = 0; i < result.records.length; i++) {
              const record = result.records[i];
              resultSet.push(new RecordDTO(record));
            }
            resolve(resultSet);
          }
        },
      );
    });
    return resultSet;
  }

  async getRecords(
    fields: string[],
    tableName: string,
    recordId1: string,
    recordId2: string,
    tokens: AuthDTO,
  ): Promise<[string, string]> {
    let record1 = '';
    let record2 = '';

    let columns = '';
    for (let i = 0; i < fields.length; i++) {
      columns += fields[i] + ',';
    }
    columns = columns.slice(0, -1);

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
        'SELECT ' +
          columns +
          ' FROM ' +
          tableName +
          ' WHERE Id = \'' +
          recordId1 +
          '\' OR Id = \'' +
          recordId2 +
          '\'',
        (err, result) => {
          if (err) {
            console.log(err);
            reject(new UnauthorizedException());
          } else {
            record1 = result.records[0];
            record2 = result.records[1];
            resolve([result.records[0], result.records[1]]);
          }
        },
      );
    });
    return [record1, record2];
  }
}
