// Authors: Marloes, Roward, Silke
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 12-05-2023

import { ModelService } from '../model.service';
import { Test } from '@nestjs/testing';
import { AuthDAO } from '../../auth/auth.dao';
import { PythonDAO } from '../../python/python.dao';
import { ModelDAO } from '../model.dao';
import { CreateModelDTO } from '../dto/create-model.dto';
import { SalesforceDAO } from 'src/salesforce/salesforce.dao';

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
  const mockedSalesforceDAO = {
    getJobs: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ModelService, ModelDAO, AuthDAO, PythonDAO],
    })
      .overrideProvider(ModelDAO)
      .useValue(mockedModelDAO)
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(PythonDAO)
      .useValue(mockedPythonDAO)
      .overrideProvider(SalesforceDAO)
      .useValue(mockedSalesforceDAO)
      .compile();

    modelService = moduleRef.get<ModelService>(ModelService);
  });

  describe('createModel', () => {
    const model = new CreateModelDTO(
      'modelName',
      'tableName',
      'modelDescription',
    );

    it('should call createModel on ModelDao', () => {
      // Arrange

      // Act
      modelService.createModel(model, 'token');

      // Assert
      expect(mockedModelDAO.createModel).toHaveBeenCalled();
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
    it('should call deleteModel on ModelDao', () => {
      // Arrange
      const modelId = '123';
      const token = 'secretToken';

      // Act
      modelService.deleteModel(token, modelId);

      // Assert
      expect(mockedModelDAO.deleteModel).toHaveBeenCalled();
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
  });
  describe('getJobs', () => {
    it('should call getJobs on SalesforceDao', () => {
      // Arrange
      const tableName = 'contacts';
      const userId = 'test123';

      // Act
      modelService.getJobs(userId, tableName);

      // Assert
      expect(mockedModelDAO.deleteModel).toHaveBeenCalled();
    });
  });
});
