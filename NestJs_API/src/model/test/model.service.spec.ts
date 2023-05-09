// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023

import { ModelService } from '../model.service';
import { Test } from '@nestjs/testing';
import { ModelDAO } from '../model.modelDAO';
import { AuthDAO } from '../../login/auth.dao';
import { PythonDAO } from '../../python/python.dao';
import {UnauthorizedException} from "@nestjs/common";

describe('ModelService', () => {
  let modelService: ModelService;
  const mockedModelDAO = {
    deleteModel: jest.fn(),
    getAllModels: jest.fn(),
  };
  const mockedAuthDAO = {
    getUserId: jest.fn((token) => {
      if (token === 'secretToken') {
        return '1';
      } else {
        return null;
      }
    }),
  };
  const mockedPythonDAO = {
    deleteModel: jest.fn(),
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

  describe('deleteModel', () => {
    it('should call deleteModel on ModelDAO', () => {
      // Arrange
      const modelId = '123';
      const token = 'secretToken';

      // Act
      modelService.deleteModel(token, modelId);

      // Assert
      expect(mockedModelDAO.deleteModel).toHaveBeenCalled();
    });

    it('should call getUserId on AuthDAO', () => {
      // Arrange
      const modelId = '123';
      const token = 'secretToken';

      // Act
      modelService.deleteModel(token, modelId);

      // Assert
      expect(mockedAuthDAO.getUserId).toHaveBeenCalled();
    });

    it('should call deleteModel on PythonDAO', () => {
      // Arrange
      const modelId = '123';
      const token = 'secretToken';

      // Act
      modelService.deleteModel(token, modelId);

      // Assert
      expect(mockedPythonDAO.deleteModel).toHaveBeenCalled();
    });

    // it('should throw an UnauthorizedException', async () => {
    //   // Arrange
    //   const modelId = '123';
    //   const token = 'falseSecretToken';
    //
    //   // Assert
    //   expect(() => {
    //     modelService.deleteModel(modelId, token);
    //   }).toThrow(new UnauthorizedException());
    // });
  });
});
