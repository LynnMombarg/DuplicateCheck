// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023

import { ModelController } from '../model.controller';
import { Test } from '@nestjs/testing';
import { ModelService } from '../model.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('ModelController', () => {
  let modelController: ModelController;
  const mockedModelService = {
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
