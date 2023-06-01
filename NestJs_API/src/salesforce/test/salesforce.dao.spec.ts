import { SalesforceDAO } from '../salesforce.dao';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthDTO } from '../../auth/dto/auth.dto';

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
    apex: {
      post: jest.fn((url, data, callback) => {
        const res = {
          jobId: 'mockJobId',
        };
        callback(null, res);
      }),
    },
    query: jest.fn(),
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

  describe('getJobStatus', () => {
    it ('should return a job status', async () => {

    }
  }
});
