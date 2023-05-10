// Authors: Marloes, Roward
// Jira-task: 107, 110
// Sprint: 2
// Last modified: 08-05-2023

import { ModelController } from '../model.controller';
import { Test } from '@nestjs/testing';
import { ModelService } from '../model.service';
import { CreateModelDTO } from '../dto/create-model.dto';

describe('ModelController', () => {
  let modelController: ModelController;

  const mockedModelService = {
    createModel: jest.fn(),
    deleteModel: jest.fn(),
    getAllModels: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [ModelService],
    })
      .overrideProvider(ModelService)
      .useValue(mockedModelService)
      .compile();

    modelController = moduleRef.get<ModelController>(ModelController);
  });

  describe('createModel', () => {
    it('should call createModel on ModelService', () => {
      // Arrange
      const model = new CreateModelDTO(
        'modelName',
        'tableName',
        'modelDescription',
      );

      // Act
      modelController.createModel(model, 'token');

      // Assert
      expect(mockedModelService.createModel).toHaveBeenCalledWith(
        model,
        'token',
      );
    });
  });
  describe('getAllModels', () => {
    it('should call getAllModels on ModelService', () => {
      // Arrange
      const token = '123';

      // Act
      modelController.getAllModels(token);

      // Assert
      expect(mockedModelService.getAllModels).toHaveBeenCalledWith(token);
    });
  });
  describe('deleteModel', () => {
    it('should call deleteModel on ModelService', () => {
      // Arrange
      const token = 'secretToken';
      const modelId = '123';

      // Act
      modelController.deleteModel(token, modelId);

      // Assert
      expect(mockedModelService.deleteModel).toHaveBeenCalled();
    });

    it('should call getAllModels on ModelService', () => {
      // Arrange
      const token = 'secretToken';
      const modelId = '123';

      // Act
      modelController.deleteModel(token, modelId);

      // Assert
      expect(mockedModelService.getAllModels).toHaveBeenCalled();
    });
  });
});
