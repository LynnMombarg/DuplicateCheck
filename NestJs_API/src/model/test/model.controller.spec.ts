import { Test } from '@nestjs/testing';
import { ModelService } from '../model.service';
import { ModelDAO } from '../model.modelDAO';
import { ModelController } from '../model.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ModelDTO } from '../display-model.DTO';

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
      const token = 'testToken';
      const modelId = 'testModelId';
      const spy = jest.spyOn(mockedModelService, 'deleteModel');
      // Act
      modelController.deleteModel(token, modelId);
      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });
});
