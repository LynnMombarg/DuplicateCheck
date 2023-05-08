// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 08-05-2023

import { ModelController } from '../model.controller';
import { Test } from '@nestjs/testing';
import { ModelService } from '../model.service';
import { CreateModelDTO } from '../dto/create-model.dto';

describe('ModelController', () => {
  let modelController: ModelController;
  let mockedModelService = {
    createModel: jest.fn(),
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
    mockedModelService = moduleRef.get(ModelService);
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
});
