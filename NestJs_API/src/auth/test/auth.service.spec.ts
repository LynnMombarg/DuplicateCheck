import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthDAO } from '../auth.dao';
import { AuthDTO } from '../dto/auth.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let authDAO: AuthDAO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthDAO,
          useValue: {
            storeToken: jest.fn(),
            updateToken: jest.fn(),
            removeTokens: jest.fn(),
            getTokensByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authDAO = module.get<AuthDAO>(AuthDAO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should call authDAO.storeToken with the correct arguments', () => {
      const userID = '123';
      const accessToken = 'access_token';
      const refreshToken = 'refresh_token';
      const jwtToken = 'jwt_token';

      authService.login(userID, accessToken, refreshToken, jwtToken);

      expect(authDAO.storeToken).toHaveBeenCalledWith(
        userID,
        accessToken,
        refreshToken,
        jwtToken,
      );
    });
  });

  describe('updateToken', () => {
    it('should call authDAO.updateToken with the correct argument', () => {
      const accessToken = 'new_access_token';

      authService.updateToken(accessToken);

      expect(authDAO.updateToken).toHaveBeenCalledWith(accessToken);
    });
  });

  describe('logout', () => {
    it('should call authDAO.removeTokens with the correct argument', () => {
      const userId = '123';

      authService.logout(userId);

      expect(authDAO.removeTokens).toHaveBeenCalledWith(userId);
    });
  });

  describe('getTokensByUserId', () => {
    it('should call authDAO.getTokensByUserId with the correct argument', async () => {
      const userId = '123';
      const getTokensByUserIdMock = jest.spyOn(authDAO, 'getTokensByUserId');

      await authService.getTokensByUserId(userId);

      expect(getTokensByUserIdMock).toHaveBeenCalledWith(userId);
    });

    it('should return the result of authDAO.getTokensByUserId', async () => {
      const userId = '123';
      const authDTO = new AuthDTO(userId, 'access_token', 'refresh_token');
      const getTokensByUserIdMock = jest
        .spyOn(authDAO, 'getTokensByUserId')
        .mockResolvedValueOnce(authDTO);

      const result = await authService.getTokensByUserId(userId);

      expect(getTokensByUserIdMock).toHaveBeenCalledWith(userId);
      expect(result).toEqual(authDTO);
    });
  });
});
