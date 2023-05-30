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
});
