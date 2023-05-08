// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { ModelService } from '../model.service';
import { Test } from '@nestjs/testing';
import { ModelController } from '../model.controller';
import { ModelDAO } from '../model.dao';
import { AuthDAO } from '../../login/auth.dao';
import { PythonDAO } from '../../python/python.dao';
import { CreateModelDTO } from '../dto/create-model.dto';

describe('ModelService', () => {
  let modelService: ModelService;
  const mockedModelDAO = {
    createModel: jest.fn(),
    getUUID: jest.fn(() => {
      return '123';
    }),
  };
  const mockedAuthDAO = {
    getUserId: jest.fn(() => {
      return '1';
    }),
  };
  const mockedPythonDAO = {
    createModel: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ModelService, ModelDAO, AuthDAO, PythonDAO],
    })
      .overrideProvider(ModelDAO)
      .useValue(mockedModelDAO)
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(PythonDAO)
      .useValue(mockedPythonDAO)
      .compile();

    modelService = moduleRef.get<ModelService>(ModelService);
  });

  describe('createModel', () => {
    it('should be called', () => {
      const model = new CreateModelDTO(
        'modelName',
        'tableName',
        'modelDescription',
        'token',
      );

      modelService.createModel(model);
      expect(mockedModelDAO.createModel).toHaveBeenCalled();
    });
  });
});
