import { SalesforceDAO } from '../salesforce.dao';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthDTO } from '../../auth/dto/auth.dto';
import { RecordDTO } from '../../training/dto/record.dto';

// Manual mock for jsforce library

const mockResult = {
  records: [
    { Id: 'mockId1', Name: 'Record 1' },
    { Id: 'mockId2', Name: 'Record 2' },
  ],
};
// Manual mock for jsforce library
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

describe('SalesforceDAO', () => {
  let salesforcedao: SalesforceDAO;

  const mockedAuthDAO = {
    getTokensByOrgId: jest.fn(),
  };

  const mockedAuthService = {
    updateToken: jest.fn(),
  };

  const authDTO = new AuthDTO(null, null, null);

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
  });

  describe('getJobs', () => {
    it('should throw an error if the tableId is error', async () => {
      await expect(salesforcedao.getJobs('error', null)).rejects.toThrow(
        'Not Found',
      );
    });
  });

  describe('getJobid', () => {
    it('should return a jobid', async () => {
      // Mock the necessary data and dependencies
      const tokens = new AuthDTO('mockAccessToken', 'mockRefreshToken', null);
      salesforcedao.oauth2 = {
        // Mock the necessary oauth2 properties
        clientId: 'mockClientId',
        clientSecret: 'mockClientSecret',
        redirectUri: 'mockRedirectUri',
      };
      process.env.SF_INSTANCE_URL = 'mockInstanceUrl';

      const result = await salesforcedao.getJobId(tokens);
      expect(result).toEqual('mockJobId');
    });
  });

  describe('getIndexes', () => {
    it('should call the correct methods and return the indexes', async () => {
      // Mock the necessary data and dependencies
      const jobId = 'mockJobId';
      const tokens = new AuthDTO('mockAccessToken', 'mockRefreshToken', null);
      salesforcedao.oauth2 = {
        // Mock the necessary oauth2 properties
        clientId: 'mockClientId',
        clientSecret: 'mockClientSecret',
        redirectUri: 'mockRedirectUri',
      };
      process.env.SF_INSTANCE_URL = 'mockInstanceUrl';

      // Mock the Connection class
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

      // Mock the Connection constructor
      jest
        .spyOn(salesforcedao.jsforce, 'Connection')
        .mockReturnValue(mockConnection);

      // Call the method being tested
      const resultPromise = salesforcedao.getIndexes(jobId, tokens);

      // Assertions
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

  // doesn't work yet
  // describe('getFields', () => {
  //   it('should call the correct methods and return the fields', async () => {
  //     // Mock the necessary data and dependencies
  //     const tableName = 'Account';
  //     const tokens = new AuthDTO('mockAccessToken', 'mockRefreshToken', null);
  //     salesforcedao.oauth2 = {
  //       // Mock the necessary oauth2 properties
  //       clientId: 'mockClientId',
  //       clientSecret: 'mockClientSecret',
  //       redirectUri: 'mockRedirectUri',
  //     };
  //     process.env.SF_INSTANCE_URL = 'mockInstanceUrl';
  //
  //     // Mock the Connection class
  //     const mockConnection = {
  //       on: jest.fn(),
  //       apex: {
  //         post: jest.fn((url, data, callback) => {
  //           const res = JSON.stringify({
  //             objects: [
  //               {
  //                 crossObjects: [
  //                   [
  //                     {
  //                       objectFrom: 'hi',
  //                     },
  //                   ],
  //                 ],
  //                 resultFields: [
  //                   {
  //                     field: 'Field1',
  //                   },
  //                   {
  //                     field: 'Field2',
  //                   },
  //                 ],
  //               },
  //               // ...
  //             ],
  //           });
  //           callback(null, res);
  //         }),
  //       },
  //     };
  //     // Mock the Connection constructor
  //     jest
  //       .spyOn(salesforcedao.jsforce, 'Connection')
  //       .mockReturnValue(mockConnection);
  //     // Mock the getJobId method
  //     jest.spyOn(salesforcedao, 'getJobId').mockResolvedValue('mockJobId');
  //
  //     // Call the method being tested
  //     expect(await salesforcedao.getFields(tableName, tokens)).toEqual([
  //       'field1',
  //       'field2',
  //     ]);
  //   });
  // });
});
