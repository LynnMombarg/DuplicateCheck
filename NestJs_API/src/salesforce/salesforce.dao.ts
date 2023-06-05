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
import { JobDTO } from '../model/dto/job-model.dto';
import { RecordDTO } from '../training/dto/record.dto';
import { DatasetDTO } from '../training/dto/dataset.dto';
import { FieldsDTO } from './dto/fields.dto';
import { Fields } from './schema/salesforce.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class SalesforceDAO {
  constructor(
    @InjectModel(Fields.name) private model: mongoose.Model<FieldsDTO>,
  ) {}

  jsforce = require('jsforce');
  oauth2 = new this.jsforce.OAuth2({
    loginUrl: 'https://login.salesforce.com',
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
    redirectUri: process.env.BASE_URL + '/auth/callback',
  });

  async insertFields(tokens: AuthDTO): Promise<void> {
    try {
      const fieldsDTO = await this.getFieldsFromSalesforce(tokens);
      const existingDocument = await this.model.findOne({
        orgId: fieldsDTO.orgId,
      });

      if (existingDocument) {
        await this.model.replaceOne({ orgId: fieldsDTO.orgId }, fieldsDTO);
      } else {
        await this.model.create(fieldsDTO);
      }
    } catch (err) {
      console.error('An error occurred:', err);

      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'An error occurred:' + err,
      });
    }
  }

  getFields(orgId: string): Promise<string[]> {
    return this.model.findOne({ orgId: orgId });
  }

  async getFieldsFromSalesforce(tokens: AuthDTO): Promise<FieldsDTO> {
    try {
      const lead: string[] = [];
      const contact: string[] = [];
      const account: string[] = [];
      const jobId = await this.getJobId(tokens);
      console.log(jobId);
      await new Promise(async (resolve, reject) => {
        let counter = 0;
        const interval = setInterval(async () => {
          if (counter > 2) {
            lead.push('Name', 'Company', 'Email', 'Phone', 'City');
            contact.push(
              'FirstName',
              'LastName',
              'AccountId',
              'Email',
              'Phone',
            );
            account.push(
              'Name',
              'Site',
              'BillingState',
              'Phone',
              'Type',
              'Owner.Alias',
            );
            clearInterval(interval);
            resolve([lead, contact, account]);
          }
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
                const tableNames = ['lead', 'contact', 'account'];
                for (let i = 0; i < 3; i++) {
                  const tableObject = jsonConfig['objects'][i];
                  if (
                    tableObject['crossObjects'][0][
                      'objectFrom'
                    ].toLowerCase() == tableNames[i]
                  ) {
                    for (
                      let j = 0;
                      j < tableObject['resultFields'].length;
                      j++
                    ) {
                      if (tableNames[i] == 'lead') {
                        lead.push(tableObject['resultFields'][j]['field']);
                      } else if (tableNames[i] == 'contact') {
                        contact.push(tableObject['resultFields'][j]['field']);
                      } else if (tableNames[i] == 'account') {
                        account.push(tableObject['resultFields'][j]['field']);
                      }
                    }
                  }
                }
                resolve([lead, contact, account]);
              },
            );
            const fieldsDTO = new FieldsDTO(
              tokens.getOrgId(),
              lead,
              contact,
              account,
            );
            return fieldsDTO;
          }
          counter++;
        }, 1000);
      });
      const fieldsDTO = new FieldsDTO(
        tokens.getOrgId(),
        lead,
        contact,
        account,
      );
      return fieldsDTO;
    } catch (err) {
      console.error('An error occurred:', err);

      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'An error occurred:' + err,
      });
    }
  }

  async getStatusOfDownload(jobId: string, tokens: AuthDTO): Promise<boolean> {
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
            console.error(err);
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
    for (let i = 0; i < fields[tableName].length; i++) {
      columns += fields[tableName][i] + ',';
    }
    columns = columns.slice(0, -1);
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
              console.error(err);
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
            console.error(err);
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

    console.log(tableName);
    let columns = '';
    for (let i = 0; i < fields[tableName].length; i++) {
      columns += fields[tableName][i] + ',';
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
          " WHERE Id = '" +
          recordId1 +
          "' OR Id = '" +
          recordId2 +
          "'",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(new UnauthorizedException());
          } else {
            record1 = result.records[0];
            record2 = result.records[1];
            resolve([record1, record2]);
          }
        },
      );
    });
    return [record1, record2];
  }
}
