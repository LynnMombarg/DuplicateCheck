// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 08-05-2023

import { ModelService } from '../model.service';
import { Test } from '@nestjs/testing';
import { ModelDAO } from '../model.dao';
import { AuthDAO } from '../../login/auth.dao';
import { PythonDAO } from '../../python/python.dao';
import { CreateModelDTO } from '../dto/create-model.dto';
import { ModelDTO } from '../dto/model.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('ModelService', () => {
  let modelService: ModelService;
  const mockedModelDAO = {
    createModel: jest.fn(),
  };
  const mockedAuthDAO = {
    getUserId: jest.fn((token) => {
      if (token === 'token') {
        return token + '123';
      }
      return null;
    }),
  };
  const mockedPythonDAO = {
    createModel: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ModelService, ModelDAO, AuthDAO, PythonDAO],
    })
      .overrideProvider(ModelDAO)
      .useValue(mockedModelDAO)
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(PythonDAO)
      .useValue(mockedPythonDAO)
      .compile();

    modelService = moduleRef.get<ModelService>(ModelService);
  });

  describe('createModel', () => {
    const model = new CreateModelDTO(
      'modelName',
      'tableName',
      'modelDescription',
    );

    it('should call createModel on ModelDAO', () => {
      // Arrange

      // Act
      modelService.createModel(model, 'token');

      // Assert
      expect(mockedModelDAO.createModel).toHaveBeenCalled();
    });

    it('should call getUserId on AuthDAO', () => {
      // Arrange
      const token = 'token';

      // Act
      modelService.createModel(model, token);

      // Assert
      expect(mockedAuthDAO.getUserId).toHaveBeenCalledWith(token);
    });

    it('should call createModel on PythonDAO', () => {
      // Arrange

      // Act
      modelService.createModel(model, 'token');

      // Assert
      expect(mockedPythonDAO.createModel).toHaveBeenCalled;
    });
  });
});
