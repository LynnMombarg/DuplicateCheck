// Authors: Marloes
// Jira-task: 130, 153
// Sprint: 3, 4
// Last modified: 30-05-2023

import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthDAO } from '../auth.dao';

describe('TrainingDAO', () => {
  let authDAO: AuthDAO;

  const mockedAuthModel = {
    create: jest.fn(),
    findOne: jest.fn().mockReturnThis(),
    deleteOne: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };
  const mockedAuthBlacklistModel = {
    create: jest.fn(),
    findOne: jest.fn().mockReturnThis(),
    deleteOne: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthDAO,
        {
          provide: getModelToken('Auth'),
          useValue: mockedAuthModel,
        },
        {
          provide: getModelToken('AuthBlacklist'),
          useValue: mockedAuthBlacklistModel,
        },
      ],
    }).compile();

    authDAO = moduleRef.get<AuthDAO>(AuthDAO);
  });

  describe('storeToken', () => {
    it('should call findOne on authModel', () => {
      // Arrange
      const orgId = 'orgId';
      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';
      const jwtToken = 'jwtToken';

      mockedAuthModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({}),
      });

      // Act
      authDAO.storeToken(orgId, accessToken, refreshToken, jwtToken);

      // Assert
      expect(mockedAuthModel.findOne).toHaveBeenCalledWith({ orgId });
    });

    it('should call create on authModel', () => {
      // Arrange
      const orgId = 'orgId';
      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';
      const jwtToken = 'jwtToken';

      mockedAuthModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({}),
      });

      // Act
      authDAO.storeToken(orgId, accessToken, refreshToken, jwtToken);

      // Assert
      expect(mockedAuthModel.create).toHaveBeenCalled();
    });
  });

  describe('updateToken', () => {
    it('should call findOne on authModel', () => {
      // Arrange
      const accessToken = 'accessToken';

      mockedAuthModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({}),
      });

      // Act
      authDAO.updateToken(accessToken);

      // Assert
      expect(mockedAuthModel.findOne).toHaveBeenCalledWith({ accessToken });
    });

    it('should call create on authModel', () => {
      // Arrange
      const accessToken = 'accessToken';

      mockedAuthModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({}),
      });

      // Act
      authDAO.updateToken(accessToken);

      // Assert
      expect(mockedAuthModel.create).toHaveBeenCalled();
    });
  });

  describe('removeTokens', () => {
    it('should call deleteOne on authModel with the correct arguments', () => {
      // Arrange
      const orgId = 'orgId';

      // Act
      authDAO.removeTokens(orgId);

      // Assert
      expect(mockedAuthModel.deleteOne).toHaveBeenCalledWith({ orgId });
    });
  });

  describe('getTokensByOrgId', () => {
    it('should call findOne on authModel', () => {
      // Arrange
      const orgId = 'orgId';

      mockedAuthModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({}),
      });

      // Act
      authDAO.getTokensByOrgId(orgId);

      // Assert
      expect(mockedAuthModel.findOne).toHaveBeenCalledWith({ orgId });
    });
  });

  describe('blackListToken', () => {
    it('should call create on authBlacklistModel', () => {
      // Arrange
      const orgId = 'orgId';
      const jwtToken = 'jwtToken';

      // Act
      authDAO.blackListToken(orgId, jwtToken);

      // Assert
      expect(mockedAuthBlacklistModel.create).toHaveBeenCalled();
    });
  });

  describe('isBlacklisted', () => {
    it('should call findOne on authBlacklistModel', async () => {
      // Arrange
      const orgId = 'orgId';
      const jwtToken = 'jwtToken';

      mockedAuthBlacklistModel.findOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce({}),
      });

      // Act
      await authDAO.isBlacklisted(orgId, jwtToken);

      // Assert
      expect(mockedAuthBlacklistModel.findOne).toHaveBeenCalledWith({
        orgId,
        jwtToken,
      });
    });
  });

  describe('removeBlacklistedToken', () => {
    it('should call deleteOne on authBlacklistModel with the correct arguments', () => {
      // Arrange
      const orgId = 'orgId';

      // Act
      authDAO.removeBlacklistedToken(orgId);

      // Assert
      expect(mockedAuthBlacklistModel.deleteOne).toHaveBeenCalledWith({
        orgId,
      });
    });
  });
});
