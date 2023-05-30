import { Test, TestingModule } from '@nestjs/testing';
import { AuthDTO } from '../dto/auth.dto';

describe('AuthDTO', () => {
  let authDTO: AuthDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthDTO],
    }).compile();

    authDTO = module.get<AuthDTO>(AuthDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of AuthDTO', () => {
      expect(authDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of AuthDTO with parameters', () => {
      const authDTO = new AuthDTO('orgId', 'accessToken', 'refreshToken');
      expect(authDTO).toBeDefined();
      expect(authDTO.orgId).toEqual('orgId');
      expect(authDTO.accessToken).toEqual('accessToken');
      expect(authDTO.refreshToken).toEqual('refreshToken');
      expect(authDTO.getOrgId()).toEqual('orgId');
      expect(authDTO.getAccessToken()).toEqual('accessToken');
      expect(authDTO.getRefreshToken()).toEqual('refreshToken');
    });
  });
});
