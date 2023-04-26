import { Test } from '@nestjs/testing';
import { ModelService } from '../model.service';
import { ModelDAO } from '../model.modelDAO';
import { ModelController } from '../model.controller';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ModelDTO } from '../display-model.DTO';

describe('ModelService', () => {
  let modelService: ModelService;
  let mockedModelDAO: DeepMocked<ModelDAO>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [
        ModelService,
        { provide: ModelDAO, useValue: mockedModelDAO },
      ],
    })
      .useMocker(createMock)
      .compile();

    modelService = moduleRef.get<ModelService>(ModelService);
    mockedModelDAO = moduleRef.get(ModelDAO);
  });

  describe('deleteModel', () => {
    it('should call deleteModel on ModelService', () => {
      // Arrange
      const token = 'testToken';
      const modelId = 'testModelId';
      const spy = jest.spyOn(mockedModelDAO, 'deleteModel');
      // Act
      modelService.deleteModel(token, modelId);
      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });
});
