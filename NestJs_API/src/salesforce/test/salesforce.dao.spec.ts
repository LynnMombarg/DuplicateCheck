import { SalesforceDAO } from '../salesforce.dao';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthDTO } from '../../auth/dto/auth.dto';

describe('SalesforceDAO', () => {
  let salesforcedao: SalesforceDAO;

  const jsforceMock = {
    Connection: jest.fn().mockImplementation(() => ({
      oauth2: {
        loginUrl: 'https://login.salesforce.com',
        clientId: 'mockClientId',
        clientSecret: 'mockClientSecret',
        redirectUri: 'mockRedirectUri',
      },
      on: jest.fn(),
      apex: {
        post: jest.fn(),
      },
      query: jest.fn(),
    })),
    OAuth2: jest.fn().mockImplementation(() => ({
      loginUrl: 'https://login.salesforce.com',
      clientId: 'mockClientId',
      clientSecret: 'mockClientSecret',
      redirectUri: 'mockRedirectUri',
    })),
  };

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

  describe('getJobs', () => {
    it('should return an error if there are no valid tokens', async () => {
      await expect(
        salesforcedao.getJobs('table name', authDTO),
      ).rejects.toThrow();
    });
  });

  describe('getIndexes', () => {
    it('should return an error if there are no valid tokens', async () => {
      await expect(
        salesforcedao.getIndexes('table name', authDTO),
      ).rejects.toThrow();
    });
  });
});
