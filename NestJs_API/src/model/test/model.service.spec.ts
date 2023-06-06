// Authors: Marloes, Roward, Silke
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 23-05-2023

import { ModelService } from '../model.service';
import { Test } from '@nestjs/testing';
import { AuthDAO } from '../../auth/auth.dao';
import { PythonDAO } from '../../python/python.dao';
import { ModelDAO } from '../model.dao';
import { CreateModelDTO } from '../dto/create-model.dto';
import { SalesforceDAO } from '../../salesforce/salesforce.dao';
import { TrainingDAO } from '../../training/training.dao';
import { ExecuteModelDTO } from '../dto/execute-model.dto';

describe('ModelService', () => {
  let modelService: ModelService;
  const mockedModelDAO = {
    createModel: jest.fn(),
    deleteModel: jest.fn(),
    getAllModels: jest.fn(),
  };
  const mockedAuthDAO = {
    getTokensByOrgId: jest.fn(),
  };
  const mockedPythonDAO = {
    createModel: jest.fn(),
    deleteModel: jest.fn(),
    executeModel: jest.fn(),
  };
  const mockedSalesforceDAO = {
    getJobs: jest.fn(),
    getFields: jest.fn(),
    getRecords: jest.fn(() => {
      return [{ data: 'test' }, { data: 'test' }];
    }),
  };

  const mockedTrainingDAO = {
    getTraining: jest.fn(),
    deleteTrainings: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ModelService,
        ModelDAO,
        AuthDAO,
        PythonDAO,
        SalesforceDAO,
        TrainingDAO,
      ],
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
      .overrideProvider(TrainingDAO)
      .useValue(mockedTrainingDAO)
      .compile();

    modelService = moduleRef.get<ModelService>(ModelService);
  });

  describe('createModel', () => {
    const model = new CreateModelDTO(
      'modelName',
      'tableName',
      'modelDescription',
      'modelid',
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
    it('should call getTokensByUserId on AuthDAO', () => {
      // Arrange
      const tableName = 'contacts';
      const orgId = 'test123';

      // Act
      modelService.getJobs(orgId, tableName);

      // Assert
      expect(mockedAuthDAO.getTokensByOrgId).toHaveBeenCalled();
    });
    it('should call getJobs on SalesforceDao', () => {
      // Arrange
      const tableName = 'contacts';
      const userId = 'test123';

      // Act
      modelService.getJobs(userId, tableName);

      // Assert
      expect(mockedSalesforceDAO.getJobs).toHaveBeenCalled();
    });
  });

  describe('getAllModels', () => {
    it('should call getAllModels on ModelDAO', () => {
      // Arrange
      const orgId = 'orgId';

      // Act
      modelService.getAllModels(orgId);

      // Assert
      expect(mockedModelDAO.getAllModels).toHaveBeenCalled();
    });
  });

  describe('executeModel', () => {
    it('should call getTokensByOrgId on authDAO', () => {
      // Arrange
      const executeModel = new ExecuteModelDTO(
        'tableName',
        'id1',
        'id2',
        'modelId',
      );
      const orgId = 'orgId';

      // Act
      modelService.executeModel(executeModel, orgId);

      // Assert
      expect(mockedAuthDAO.getTokensByOrgId).toHaveBeenCalled();
    });

    it('should call getFields on salesforceDAO', () => {
      // Arrange
      const executeModel = new ExecuteModelDTO(
        'tableName',
        'id1',
        'id2',
        'modelId',
      );
      const orgId = 'orgId';

      // Act
      modelService.executeModel(executeModel, orgId);

      // Assert
      expect(mockedSalesforceDAO.getFields).toHaveBeenCalled();
    });

    it('should call getRecords on salesforceDAO', () => {
      // Arrange
      const executeModel = new ExecuteModelDTO(
        'tableName',
        'id1',
        'id2',
        'modelId',
      );
      const orgId = 'orgId';

      // Act
      modelService.executeModel(executeModel, orgId);

      // Assert
      expect(mockedSalesforceDAO.getRecords).toHaveBeenCalled();
    });
    it('should call executeModel on pythonDAO', () => {
      // Arrange
      const executeModel = new ExecuteModelDTO(
        'tableName',
        'id1',
        'id2',
        'modelId',
      );
      const orgId = 'orgId';

      // Act
      modelService.executeModel(executeModel, orgId);

      // Assert
      expect(mockedPythonDAO.executeModel).toHaveBeenCalled();
    });
  });
});
