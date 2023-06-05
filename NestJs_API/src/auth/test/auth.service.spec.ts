import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthDAO } from '../auth.dao';
import { AuthDTO } from '../dto/auth.dto';
import { SalesforceDAO } from '../../salesforce/salesforce.dao';

describe('AuthService', () => {
  let authService: AuthService;
  let authDAO: AuthDAO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SalesforceDAO,
          useValue: {
            insertFields: jest.fn(),
          },
        },
        {
          provide: AuthDAO,
          useValue: {
            storeToken: jest.fn(),
            updateToken: jest.fn(),
            removeTokens: jest.fn(),
            getTokensByOrgId: jest.fn(),
            removeBlacklistedToken: jest.fn(),
            blackListToken: jest.fn(),
            isBlacklisted: jest.fn(),
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
    it('should call storeToken on AuthDAO with the correct arguments', () => {
      // Arrange
      const orgId = '123';
      const accessToken = 'access_token';
      const refreshToken = 'refresh_token';
      const jwtToken = 'jwt_token';

      // Act
      authService.login(orgId, accessToken, refreshToken, jwtToken);

      // Assert
      expect(authDAO.storeToken).toHaveBeenCalledWith(
        orgId,
        accessToken,
        refreshToken,
        jwtToken,
      );
    });

    it('should call removeBlacklistedToken on AuthDAO with the correct arguments', () => {
      // Arrange
      const orgId = '123';
      const accessToken = 'access_token';
      const refreshToken = 'refresh_token';
      const jwtToken = 'jwt_token';

      // Act
      authService.login(orgId, accessToken, refreshToken, jwtToken);

      // Assert
      expect(authDAO.removeBlacklistedToken).toHaveBeenCalledWith(orgId);
    });
  });

  describe('updateToken', () => {
    it('should call updateToken on AuthDAO with the correct arguments', () => {
      // Arrange
      const accessToken = 'new_access_token';

      // Act
      authService.updateToken(accessToken);

      // Assert
      expect(authDAO.updateToken).toHaveBeenCalledWith(accessToken);
    });
  });

  describe('logout', () => {
    it('should call removeTokens on AuthDAO with the correct arguments', () => {
      // Arrange
      const orgId = '123';

      // Act
      authService.logout(orgId);

      // Assert
      expect(authDAO.removeTokens).toHaveBeenCalledWith(orgId);
    });
  });

  describe('getTokensByOrgId', () => {
    it('should call getTokensByOrgId on AuthDAO with the correct arguments', async () => {
      // Arrange
      const orgId = '123';

      // Act
      await authService.getTokensByOrgId(orgId);

      // Assert
      expect(authDAO.getTokensByOrgId).toHaveBeenCalledWith(orgId);
    });

    it('should return the result of getTokensByOrgId', async () => {
      // Arrange
      const orgId = '123';
      const expected = new AuthDTO(orgId, 'access_token', 'refresh_token');
      const getTokensByOrgIdMock = jest
        .spyOn(authDAO, 'getTokensByOrgId')
        .mockResolvedValueOnce(expected);

      // Act
      const actual = await authService.getTokensByOrgId(orgId);

      // Assert
      expect(getTokensByOrgIdMock).toHaveBeenCalledWith(orgId);
      expect(actual).toEqual(expected);
    });
  });

  describe('blackListToken', () => {
    it('should call blackListToken on AuthDAO with the correct arguments', () => {
      // Arrange
      const orgId = 'orgId';
      const jwtToken = 'jwtToken';

      // Act
      authService.blackListToken(orgId, jwtToken);

      // Assert
      expect(authDAO.blackListToken).toHaveBeenCalledWith(orgId, jwtToken);
    });
  });

  describe('isBlacklisted', () => {
    it('should call isBlacklisted on AuthDAO with the correct arguments', () => {
      // Arrange
      const orgId = 'orgId';
      const jwtToken = 'jwtToken';

      // Act
      authService.isBlacklisted(orgId, jwtToken);

      // Assert
      expect(authDAO.isBlacklisted).toHaveBeenCalledWith(orgId, jwtToken);
    });

    it('should return the result of isBlacklisted', async () => {
      // Arrange
      const orgId = '123';
      const jwtToken = 'jwtToken';
      const expected = true;
      const isBlacklistedMock = jest
        .spyOn(authDAO, 'isBlacklisted')
        .mockResolvedValueOnce(expected);

      // Act
      const actual = await authService.isBlacklisted(orgId, jwtToken);

      // Assert
      expect(isBlacklistedMock).toHaveBeenCalledWith(orgId, jwtToken);
      expect(actual).toEqual(expected);
    });
  });

  describe('removeBlacklistedToken', () => {
    it('should call removeBlacklistedToken on AuthDAO with the correct arguments', () => {
      // Arrange
      const orgId = 'orgId';

      // Act
      authService.removeBlacklistedToken(orgId);

      // Assert
      expect(authDAO.removeBlacklistedToken).toHaveBeenCalledWith(orgId);
    });
  });
});
