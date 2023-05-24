import { SalesforceDAO } from '../salesforce.dao';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthModule } from '../../auth/auth.module';
import { AuthDTO } from '../../auth/auth.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('SalesforceDAO', () => {
  let salesforcedao: SalesforceDAO;

  const mockedAuthDAO = {
    getTokensByOrgId: jest.fn(),
  };

  const mockedAuthService = {
    updateToken: jest.fn(),
  };

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
});
