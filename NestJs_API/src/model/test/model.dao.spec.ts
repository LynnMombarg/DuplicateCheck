// Authors:  Silke
// Jira-task: 142
// Sprint: 3
// Last modified: 17-05-2023

import { Test } from '@nestjs/testing';
import { ModelDAO } from '../model.dao';
import { Model, ModelDocument, ModelSchema } from "../schema/model.schema";
import { ModelDTO } from '../dto/model.dto';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

describe('ModelDAO', () => {
  let modelDAO: ModelDAO;
  let modelModel: mongoose.Model<ModelDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }]),
      ],
      providers: [ModelDAO],
    }).compile();

    modelDAO = moduleRef.get<ModelDAO>(ModelDAO);
    modelModel = moduleRef.get(getModelToken(Model.name));
  });

  describe('createModel', () => {
    it('should call save on model', async () => {
      // Arrange
      const modelDTO: ModelDTO = {
        modelName: 'Test Model',
        modelId: 'test-model-id',
        tableName: 'test-table',
        modelDescription: 'Test model description',
        userId: 'test-user-id',
      };

      const saveSpy = jest.spyOn(modelModel.prototype, 'save');

      // Act
      await modelDAO.createModel(modelDTO);

      // Assert
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe('getAllModels', () => {
    it('it should return the model', async () => {
      const modelDTO: ModelDTO = {
        modelName: 'Test Model',
        modelId: 'test-model-id',
        tableName: 'test-table',
        modelDescription: 'Test model description',
        userId: 'test-user-id',
      };

      //mockReturnValueOnce(modelModel, modelDTO);
    });
  });
});
