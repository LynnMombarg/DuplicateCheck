// Authors:  Diederik
// Jira-task: 183
// Sprint: 4
// Last modified: 30-05-2023

import { Test, TestingModule } from '@nestjs/testing';
import { JobDTO } from '../dto/job-model.dto';

describe('JobDTO', () => {
  let jobDTO: JobDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobDTO],
    }).compile();

    jobDTO = module.get<JobDTO>(JobDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of JobDTO', () => {
      expect(jobDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of JobDTO with parameters', () => {
      const jobDTO = new JobDTO('jobName', 'jobId');
      expect(jobDTO).toBeDefined();
      expect(jobDTO.jobName).toEqual('jobName');
      expect(jobDTO.jobId).toEqual('jobId');
    });
  });
});
