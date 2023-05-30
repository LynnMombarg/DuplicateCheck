// Authors:  Diederik
// Jira-task: 183
// Sprint: 4
// Last modified: 30-05-2023

import { Test, TestingModule } from '@nestjs/testing';
import { CreateModelDTO } from '../dto/create-model.dto';

describe('CreateModelDTO', () => {
  let createModelDTO: CreateModelDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateModelDTO],
    }).compile();

    createModelDTO = module.get<CreateModelDTO>(CreateModelDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of CreateModelDTO', () => {
      expect(createModelDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of CreateModelDTO with parameters', () => {
      const createModelDTO = new CreateModelDTO(
        'modelName',
        'tableName',
        'modelDescription',
      );
      expect(createModelDTO).toBeDefined();
      expect(createModelDTO.modelName).toEqual('modelName');
      expect(createModelDTO.tableName).toEqual('tableName');
      expect(createModelDTO.modelDescription).toEqual('modelDescription');
    });
  });
});
