import { Test, TestingModule } from '@nestjs/testing';
import { CreateTrainingDTO } from '../dto/create-training.dto';

describe('CreateTrainingDTO', () => {
  let createTrainingDTO: CreateTrainingDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTrainingDTO],
    }).compile();

    createTrainingDTO = module.get<CreateTrainingDTO>(CreateTrainingDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of CreateTrainingDTO', () => {
      expect(createTrainingDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of CreateTrainingDTO with parameters', () => {
      const createTrainingDTO = new CreateTrainingDTO('jobId', 'tableName');
      expect(createTrainingDTO).toBeDefined();
      expect(createTrainingDTO.jobId).toEqual('jobId');
      expect(createTrainingDTO.tableName).toEqual('tableName');
    });
  });
});
