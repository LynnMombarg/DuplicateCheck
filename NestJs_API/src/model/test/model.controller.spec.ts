// Authors: Marloes, Roward, Silke
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 23-05-2023

import { ModelController } from '../model.controller';
import { Test } from '@nestjs/testing';
import { ModelService } from '../model.service';
import { CreateModelDTO } from '../dto/create-model.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { ExecuteModelDTO } from '../dto/execute-model.dto';

describe('ModelController', () => {
  let modelController: ModelController;

  const mockedModelService = {
    createModel: jest.fn(),
    deleteModel: jest.fn(),
    getAllModels: jest.fn(),
    getJobs: jest.fn(),
    executeModel: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [
        AuthService,
        JwtService,
        ModelService,
        {
          provide: AuthDAO,
          useValue: jest.fn(),
        },
        {
          provide: AuthGuard,
          useValue: jest.fn(),
        },
      ],
    })
      .overrideProvider(ModelService)
      .useValue(mockedModelService)
      .compile();

    modelController = moduleRef.get<ModelController>(ModelController);
  });

  describe('createModel', () => {
    it('should call createModel on ModelService', () => {
      // Arrange
      const req = { user: { orgId: 'test' } };
      const model = new CreateModelDTO(
        'modelName',
        'tableName',
        'modelDescription',
        'modelId',
      );

      // Act
      modelController.createModel(model, req);

      // Assert
      expect(mockedModelService.createModel).toHaveBeenCalledWith(
        model,
        'test',
      );
    });
  });
  describe('getAllModels', () => {
    it('should call getAllModels on ModelService', () => {
      // Arrange
      const req = { user: { orgId: 'test' } };

      // Act
      modelController.getAllModels(req);

      // Assert
      expect(mockedModelService.getAllModels).toHaveBeenCalledWith('test');
    });
  });

  describe('deleteModel', () => {
    it('should call deleteModel on ModelService', () => {
      // Arrange
      const req = { user: { userId: 'test' } };
      const modelId = '123';

      // Act
      modelController.deleteModel(req, modelId);

      // Assert
      expect(mockedModelService.deleteModel).toHaveBeenCalled();
    });

    it('should call getAllModels on ModelService', () => {
      // Arrange
      const req = { user: { userId: 'test' } };
      const modelId = 'test';

      // Act
      modelController.deleteModel(req, modelId);

      // Assert
      expect(mockedModelService.getAllModels).toHaveBeenCalled();
    });
  });
  describe('getJobs', () => {
    it('should call getJobs on ModelService', () => {
      // Arrange
      const req = { user: { userId: 'test' } };
      const tableName = 'contacts';

      // Act
      modelController.getJobs(req, tableName);

      // Assert
      expect(mockedModelService.getJobs).toHaveBeenCalled();
    });
  });
  describe('executeModel', () => {
    it('should call executeModel on ModelService', () => {
      // Arrange
      const req = { user: { userId: 'test' } };
      const executeModel = new ExecuteModelDTO("tableName", "id1", "id2", "modelId");

      // Act
      modelController.executeModel(executeModel, req);

      // Assert
      expect(mockedModelService.executeModel).toHaveBeenCalled();
    });
  });
});
