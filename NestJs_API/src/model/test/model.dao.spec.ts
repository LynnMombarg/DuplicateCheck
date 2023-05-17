// Authors:  Silke
// Jira-task: 142
// Sprint: 3
// Last modified: 17-05-2023

import { Test } from '@nestjs/testing';
import { ModelDAO } from "../model.dao";

describe('ModelDAO', () => {
  let modelDAO: ModelDAO;

  const mockedModel = {
    model: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ModelDAO,
        {
          provide: 'Model',
          useValue: mockedModel,
        },
      ],
    }).compile();

    modelDAO = moduleRef.get<ModelDAO>(ModelDAO);
  });

  describe('createModel', () => {

it('should call save on model', async () => {
      // Arrange

      // Act
      await modelDAO.createModel(model);

      // Assert
      expect(mockedModel.save).toBeCalled();
    });
  });
});





