// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { ModelController } from '../model.controller';
import { Test } from '@nestjs/testing';
import { ModelService } from '../model.service';
import { CreateModelDTO } from '../dto/create-model.dto';
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

  describe('createModel', () => {
    it('should call createModel on ModelService', () => {
      // Arrange
      const model = new CreateModelDTO(
        'modelName',
        'tableName',
        'modelDescription',
        'token',
      );
      const spy = jest.spyOn(mockedModelService, 'createModel');

      // Act
      modelController.createModel(model);

      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });
});
