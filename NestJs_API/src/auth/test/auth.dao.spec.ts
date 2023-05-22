// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 16-05-2023

import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthDAO } from '../auth.dao';
import { Auth, AuthBlacklist } from '../auth.schema';
import { before } from 'node:test';

describe('TrainingDAO', () => {
  let authDAO: AuthDAO;
  const mockedAuthModel = {
    model: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    then: jest.fn(),
    deleteOne: jest.fn(),
  };
  const mockedAuthBlacklistModel = {
    save: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    then: jest.fn(),
    deleteOne: jest.fn(),
  };


  const mockedTrainingWithoutMatch = {
    _id: '6461fddec0437f4f44cbdb53',
    trainingId: 'trainingId',
    userId: 'req.user.userId',
    datasetA: {
      records: [
        {
          data: ['1', 'Hoi'],
          _id: { $oid: '6461fcde17a65a5fbd3809e2' },
        },
        {
          data: ['2', 'Doei'],
          _id: { $oid: '6461fcde17a65a5fbd3809e3' },
        },
      ],
      _id: { $oid: '6461fcde17a65a5fbd3809e1' },
    },
    datasetB: {
      records: [
        {
          data: ['1', 'Hi'],
          _id: { $oid: '6461fcde17a65a5fbd3809e5' },
        },
        {
          data: ['3', 'Doei'],
          _id: { $oid: '6461fcde17a65a5fbd3809e6' },
        },
      ],
      _id: { $oid: '6461fcde17a65a5fbd3809e4' },
    },
    matches: [],
    __v: 0,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthDAO,
        {
          provide: getModelToken(Auth.name),
          useValue: mockedAuthModel,
        },
        {
          provide: getModelToken(AuthBlacklist.name),
          useValue: mockedAuthBlacklistModel,
        },
      ],
    }).compile();

    authDAO = moduleRef.get<AuthDAO>(AuthDAO);
  });

  describe('storeToken', () => {
    it('should find the user by userID', () => {
      // Arrange
      const userID = 'test123';
      const accessToken = 'test123';
      const refresh_token = 'test123';
      const jwtToken = 'test123';

      // Act
      authDAO.storeToken(userID, accessToken, refresh_token, jwtToken);

      // Assert
      expect(mockedAuthModel.findOne).toHaveBeenCalledWith({
        userID: userID,
      });
    });
    it('should save the tokens', () => {
      // Arrange
      const userID = 'test123';
      const accessToken = 'test123';
      const refresh_token = 'test123';
      const jwtToken = 'test123';

      // Act
      authDAO.storeToken(userID, accessToken, refresh_token, jwtToken);

      // Assert
      expect(mockedAuthModel.save).toHaveBeenCalled();
    });
  });

  describe('updateToken', () => {
    it('should find a user by accessToken', () => {
      // Arrange
      const accessToken = 'test123';

      // Act
      authDAO.updateToken(accessToken);

      // Assert
      expect(mockedAuthModel.findOne).toHaveBeenCalledWith({
        accessToken: accessToken,
      });
    });
    it('should update the token', () => {
      // Arrange
      const accessToken = 'test123';

      // Act
      authDAO.updateToken(accessToken);

      // Assert
      expect(mockedAuthModel.save).toHaveBeenCalled();
    });
  });

  describe('removeToken', () => {
    it('delete the token', () => {
      // Arrange
      const userID = 'test123';

      // Act
      authDAO.removeTokens(userID);

      // Assert
      expect(mockedAuthModel.deleteOne).toHaveBeenCalledWith({
        userID: userID,
      });
    });
  });
});
