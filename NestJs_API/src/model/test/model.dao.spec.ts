// Authors:  Silke
// Jira-task: 142
// Sprint: 3
// Last modified: 23-05-2023

import { Test } from '@nestjs/testing';
import { ModelDAO } from '../model.dao';
import { ModelDTO } from '../dto/model.dto';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

describe('ModelDAO', () => {
  let modelDAO: ModelDAO;

  const modelDTO: ModelDTO = {
    modelName: 'Test Model',
    modelId: 'test-model-id',
    tableName: 'test-table',
    modelDescription: 'Test model description',
    orgId: 'test-user-id',
  };

  const mockedMongooseModel = {
    find: jest.fn(),
    save: jest.fn(),
    deleteOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ModelDAO,
        {
          provide: getModelToken('Model'),
          useValue: mockedMongooseModel,
        },
      ],
    }).compile();

    modelDAO = moduleRef.get<ModelDAO>(ModelDAO);
  });

  describe('createModel', () => {
    it('should call create on model', async () => {
      // Act
      await modelDAO.createModel(modelDTO);

      // Assert
      expect(mockedMongooseModel.create).toHaveBeenCalledWith(modelDTO);
    });
  });

  describe('getAllModels', () => {
    it('should return the model', async () => {
      // Arrange
      mockedMongooseModel.find.mockReturnValue(modelDTO);

      // Act
      const result = await modelDAO.getAllModels('test-user-id');

      // Assert
      expect(mockedMongooseModel.find).toHaveBeenCalledWith({
        orgId: 'test-user-id',
      });
      expect(result).toEqual(modelDTO);
    });
  });

  describe('deleteModel', () => {
    it('should call deleteModel on model', async () => {
      // Arrange
      mockedMongooseModel.deleteOne.mockReturnValue({ deletedCount: 1 });

      // Act
      await modelDAO.deleteModel('test-model-id', 'test-user-id');

      // Assert
      expect(mockedMongooseModel.deleteOne).not.toThrow();
      expect(mockedMongooseModel.deleteOne).toHaveBeenCalledWith({
        modelId: 'test-model-id',
        orgId: 'test-user-id',
      });
    });
  });

  describe('deleteModel', () => {
    it('should throw NotFoundException when no model is found', async () => {
      // Arrange
      mockedMongooseModel.deleteOne.mockReturnValue({ deletedCount: 0 });

      // Act and Assert
      await expect(
        modelDAO.deleteModel('test-model-id', 'test-user-id'),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
