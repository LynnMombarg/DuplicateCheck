// Authors:  Silke
// Jira-task: 142
// Sprint: 3
// Last modified: 17-05-2023

import { Test } from '@nestjs/testing';
import { ModelDAO } from '../model.dao';
import { Model, ModelDocument, ModelSchema } from '../schema/model.schema';
import { ModelDTO } from '../dto/model.dto';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

describe('ModelDAO', () => {
  let modelDAO: ModelDAO;
  let modelModel: mongoose.Model<ModelDocument>;

  const modelDTO: ModelDTO = {
    modelName: 'Test Model',
    modelId: 'test-model-id',
    tableName: 'test-table',
    modelDescription: 'Test model description',
    userId: 'test-user-id',
  };

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
      const saveSpy = jest.spyOn(modelModel.prototype, 'save');

      // Act
      await modelDAO.createModel(modelDTO);

      // Assert
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe('getAllModels', () => {
    it('should return the model', async () => {
      // Arrange
      const findSpy = jest.spyOn(modelModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([modelDTO]),
      } as any);

      // Act
      const result = await modelDAO.getAllModels('test-user-id');

      // Assert
      expect(findSpy).toHaveBeenCalledWith({ userId: 'test-user-id' });
      expect(result).toEqual([
        {
          modelName: 'Test Model',
          modelId: 'test-model-id',
          tableName: 'test-table',
          modelDescription: 'Test model description',
          userId: 'test-user-id',
        },
      ]);
    });
  });

  describe('deleteModel', () => {
    it('should call deleteOne on model', async () => {
      // Arrange
      const deleteOneSpy = jest.spyOn(modelModel, 'deleteOne');

      // Act
      await modelDAO.deleteModel('test-model-id', 'test-user-id');

      // Assert
      expect(deleteOneSpy).toHaveBeenCalledWith({
        modelId: 'test-model-id',
        userId: 'test-user-id',
      });
    });
  });

  describe('deleteModel', () => {
    it('should throw NotFoundException when no model is found', async () => {
      // Arrange
      jest.spyOn(modelModel, 'deleteOne').mockResolvedValueOnce({
        deletedCount: 0,
      } as any);

      // Act
      const result = modelDAO.deleteModel('test-model-id', 'test-user-id');

      // Assert
      await expect(result).rejects.toThrowError('Not Found');
    });
  });
});
