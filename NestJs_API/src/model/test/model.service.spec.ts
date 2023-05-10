// Authors: Marloes, Roward
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 10-05-2023

import { ModelService } from '../model.service';
import { Test } from '@nestjs/testing';
import { AuthDAO } from '../../login/auth.dao';
import { PythonDAO } from '../../python/python.dao';
import { ModelDAO } from '../model.dao';
import { CreateModelDTO } from '../dto/create-model.dto';

describe('ModelService', () => {
  let modelService: ModelService;
  const mockedModelDAO = {
    createModel: jest.fn(),
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
    createModel: jest.fn(),
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
