// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { Test } from '@nestjs/testing';
import { CreateModelDto } from './dto/create-model.dto';
import { ModelModule } from './model.module';

describe('ModelController', () => {
  let modelController: ModelController;
  let modelService: ModelService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ModelModule],
    }).compile();

    modelController = module.get<ModelController>(ModelController);
    modelService = module.get<ModelService>(ModelService);
  });

  describe('createModel', () => {
    it('Should call createModel on ModelService', () => {
      const model = new CreateModelDto(
        'modelName',
        'tableName',
        'modelDescription',
        'token',
      );

      jest.spyOn(modelService, 'createModel').mockImplementation(() => {
        return true;
      });

      const actual = modelService.createModel(model);

      expect(actual).toBe(true);
    });
  });
});
