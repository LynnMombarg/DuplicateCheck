import { SalesforceDAO } from '../salesforce.dao';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthDTO } from '../../auth/dto/auth.dto';
import { RecordDTO } from '../../training/dto/record.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('SalesforceDAO', () => {
  const mockResult = {
    records: [
      { Id: 'mockId1', Name: 'Record 1' },
      { Id: 'mockId2', Name: 'Record 2' },
    ],
  };

  jest.mock('jsforce', () => {
    const mockConnection = {
      oauth2: {
        loginUrl: 'https://login.salesforce.com',
        clientId: 'mockClientId',
        clientSecret: 'mockClientSecret',
        redirectUri: 'mockRedirectUri',
      },
      on: jest.fn(),
      query: jest.fn(() => {
        return mockResult;
      }),
      apex: {
        post: jest.fn((url, data, callback) => {
          const res = {
            jobId: 'mockJobId',
          };
          callback(null, res);
        }),
      },
    };

    return {
      Connection: jest.fn().mockImplementation(() => mockConnection),
      OAuth2: jest.fn().mockImplementation(() => mockConnection.oauth2),
    };
  });

  const mockedAuthDAO = {
    getTokensByOrgId: jest.fn(),
  };

  const mockedAuthService = {
    updateToken: jest.fn(),
  };

  let salesforcedao: SalesforceDAO;
  let tokens;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SalesforceDAO, AuthService, AuthDAO],
    })
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(AuthService)
      .useValue(mockedAuthService)
      .compile();

    salesforcedao = moduleRef.get<SalesforceDAO>(SalesforceDAO);

    tokens = new AuthDTO('mockAccessToken', 'mockRefreshToken', null);
    salesforcedao.oauth2 = {
      clientId: 'mockClientId',
      clientSecret: 'mockClientSecret',
      redirectUri: 'mockRedirectUri',
    };
    process.env.SF_INSTANCE_URL = 'mockInstanceUrl';
  });

  describe('getJobs', () => {
    it('should throw an error if the tableId is error', async () => {
      // act/assert
      await expect(salesforcedao.getJobs('error', null)).rejects.toThrow(
        'Not Found',
      );
    });
  });

  describe('getJobid', () => {
    it('should return a jobid', async () => {
      // arrange is in the mockConnection at the top
      // act
      const result = await salesforcedao.getJobId(tokens);
      //assert
      expect(result).toEqual('mockJobId');
    });
  });

  describe('getIndexes', () => {
    it('should call the correct methods and return the indexes', async () => {
      // arrange
      const jobId = 'mockJobId';
      const mockConnection = {
        on: jest.fn(),
        query: jest.fn().mockImplementation((query, callback) => {
          const mockResult = {
            records: [
              {
                dupcheck__SourceObject__c: 'sourceIndex1',
                dupcheck__MatchObject__c: 'matchIndex1',
              },
              {
                dupcheck__SourceObject__c: 'sourceIndex2',
                dupcheck__MatchObject__c: 'matchIndex2',
              },
            ],
          };
          callback(null, mockResult);
        }),
      };

      jest
        .spyOn(salesforcedao.jsforce, 'Connection')
        .mockReturnValue(mockConnection);

      // act
      const resultPromise = salesforcedao.getIndexes(jobId, tokens);

      // assert
      await expect(resultPromise).resolves.toEqual([
        "'sourceIndex1','sourceIndex2'",
        "'matchIndex1','matchIndex2'",
      ]);
      expect(mockConnection.query).toHaveBeenCalledWith(
        "SELECT dupcheck__SourceObject__c, dupcheck__MatchObject__c FROM dupcheck__dc3Duplicate__c D WHERE dupcheck__dcGroup__c IN (SELECT Id FROM dupcheck__dcGroup__c G WHERE dupcheck__dcJob__c = 'mockJobId')",
        expect.any(Function),
      );
    });
  });

  describe('getIndexes', () => {
    it('should return an unauthorized exception', async () => {
      // arrange
      const jobId = 'mockJobId';
      const mockConnection = {
        on: jest.fn(),
        query: jest.fn().mockImplementation((query, callback) => {
          const mockResult = {
            records: [
              {
                dupcheck__SourceObject__c: 'sourceIndex1',
                dupcheck__MatchObject__c: 'matchIndex1',
              },
              {
                dupcheck__SourceObject__c: 'sourceIndex2',
                dupcheck__MatchObject__c: 'matchIndex2',
              },
            ],
          };
          callback({ errorCode: 'INVALID_SESSION_ID' }, mockResult);
        }),
      };

      jest
        .spyOn(salesforcedao.jsforce, 'Connection')
        .mockReturnValue(mockConnection);

      // act
      const resultPromise = salesforcedao.getIndexes(jobId, tokens);

      // assert
      await expect(resultPromise).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getMatchRecords', () => {
    it('should return match records', async () => {
      // arrange
      const mockQuery = jest.fn().mockImplementation((query, callback) => {
        const mockResult = {
          records: [['data', 'data']],
        };
        callback(null, mockResult);
      });
      salesforcedao.jsforce.Connection.mockImplementation(() => ({
        query: mockQuery,
        on: jest.fn(),
      }));

      // act
      const columns = 'Name';
      const tableName = 'Account';
      const matchIndexes = 'mockId1,mockId2';
      const result = await salesforcedao.getMatchRecords(
        columns,
        tableName,
        matchIndexes,
        tokens,
      );

      // assert
      expect(mockQuery).toHaveBeenCalledWith(
        `SELECT ${columns} FROM ${tableName} WHERE Id IN (${matchIndexes})`,
        expect.any(Function),
      );
      expect(result).toEqual([new RecordDTO(['data', 'data'])]);
    });
  });

  describe('getMatchRecords', () => {
    it('should return an unauthorized exception', async () => {
      // arrange
      const mockQuery = jest.fn().mockImplementation((query, callback) => {
        const mockResult = {
          records: [['data', 'data']],
        };
        callback({ errorCode: 'INVALID_SESSION_ID' }, mockResult);
      });
      salesforcedao.jsforce.Connection.mockImplementation(() => ({
        query: mockQuery,
        on: jest.fn(),
      }));
      // act
      const columns = 'Name';
      const tableName = 'Account';
      const matchIndexes = 'mockId1,mockId2';
      const resultPromise = salesforcedao.getMatchRecords(
        columns,
        tableName,
        matchIndexes,
        tokens,
      );
      // assert
      await expect(resultPromise).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getSourceRecords', () => {
    it('should return source records', async () => {
      // arrange
      const mockQuery = jest.fn().mockImplementation((query, callback) => {
        const mockResult = {
          records: [['data', 'data', 'data']],
        };
        callback(null, mockResult);
      });
      salesforcedao.jsforce.Connection.mockImplementation(() => ({
        query: mockQuery,
        on: jest.fn(),
      }));

      // act
      const columns = 'Name';
      const tableName = 'Leads';
      const sourceIndexes = 'mockId1,mockId2';
      const result = await salesforcedao.getSourceRecords(
        columns,
        tableName,
        sourceIndexes,
        tokens,
      );

      // assert
      expect(mockQuery).toHaveBeenCalledWith(
        `SELECT ${columns} FROM ${tableName} WHERE Id IN (${sourceIndexes})`,
        expect.any(Function),
      );
      expect(result).toEqual([new RecordDTO(['data', 'data', 'data'])]);
    });
  });

  describe('getSourceRecords', () => {
    it('should return a Bad Request exception', async () => {
      // arrange
      const mockQuery = jest.fn().mockImplementation((query, callback) => {
        const mockResult = {
          records: [['data', 'data', 'data']],
        };
        callback({ message: 'Unauthorized' }, mockResult);
      });
      salesforcedao.jsforce.Connection.mockImplementation(() => ({
        query: mockQuery,
        on: jest.fn(),
      }));

      // act
      const columns = 'Name';
      const tableName = 'Leads';
      const sourceIndexes = 'mockId1,mockId2';
      const resultPromise = salesforcedao.getSourceRecords(
        columns,
        tableName,
        sourceIndexes,
        tokens,
      );

      // assert
      await expect(resultPromise).rejects.toThrow('Bad Request');
    });
  });
});
