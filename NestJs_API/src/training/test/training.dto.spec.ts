// Authors:  Diederik
// Jira-task: 183
// Sprint: 4
// Last modified: 30-05-2023

import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDTO } from '../dto/training.dto';
import { DatasetDTO } from '../dto/dataset.dto';

describe('TrainingDTO', () => {
  let trainingDTO: TrainingDTO;
  let datasetDTO: DatasetDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingDTO, DatasetDTO],
    }).compile();

    trainingDTO = module.get<TrainingDTO>(TrainingDTO);
    datasetDTO = module.get<DatasetDTO>(DatasetDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of TrainingDTO', () => {
      expect(trainingDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of TrainingDTO with parameters', () => {
      const trainingDTO = new TrainingDTO(
        'trainingId',
        'jobId',
        'modelId',
        datasetDTO,
        datasetDTO,
        [true],
      );
      expect(trainingDTO).toBeDefined();
      expect(trainingDTO.trainingId).toEqual('trainingId');
      expect(trainingDTO.orgId).toEqual('jobId');
      expect(trainingDTO.modelId).toEqual('modelId');
      expect(trainingDTO.datasetA).toEqual(datasetDTO);
      expect(trainingDTO.datasetB).toEqual(datasetDTO);
      expect(trainingDTO.matches).toEqual([true]);
    });
  });
});
