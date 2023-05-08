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
  let mockedModelService: DeepMocked<ModelService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [ModelService],
    })
      .useMocker(createMock)
      .compile();

    modelController = moduleRef.get<ModelController>(ModelController);
    mockedModelService = moduleRef.get(ModelService);
  });

  describe('deleteModel', () => {
    it('should call deleteModel on ModelService', () => {
      // Arrange
      const token = "secretToken";
      const modelId = "123";
      const spy = jest.spyOn(mockedModelService, 'deleteModel');

      // Act
      modelController.deleteModel(token, modelId);

      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should call getAllModels on ModelService', () => {
      // Arrange
      const token = "secretToken";
      const modelId = "123";
      const spy = jest.spyOn(mockedModelService, 'getAllModels');

      // Act
      modelController.deleteModel(token, modelId);

      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });
});