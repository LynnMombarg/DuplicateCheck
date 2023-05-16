// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Test } from '@nestjs/testing';
import { TrainingService } from '../training.service';
import { TrainingDAO } from '../training.dao';
import { SalesforceDAO } from '../../salesforce/salesforce.dao';
import { AuthDAO } from '../../auth/auth.dao';

describe('TrainingService', () => {
  let trainingService: TrainingService;

  const mockedTrainingDAO = {
    createTraining: jest.fn(),
  };
  const mockedAuthDAO = {
    getTokensByUserId: jest.fn(),
  };
  const mockedSalesforceDAO = {
    getDatasets: jest.fn(() => {
      return ['test', 'test'];
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TrainingService, TrainingDAO, AuthDAO, SalesforceDAO],
    })
      .overrideProvider(TrainingDAO)
      .useValue(mockedTrainingDAO)
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(SalesforceDAO)
      .useValue(mockedSalesforceDAO)
      .compile();

    trainingService = moduleRef.get<TrainingService>(TrainingService);
  });

  describe('selectJob', () => {
    it('should call getTokensByUserId on AuthDAO', () => {
      // Arrange
      const jobId = 'test123';
      const userId = 'token';

      // Act
      trainingService.selectJob(jobId, userId);

      // Assert
      expect(mockedAuthDAO.getTokensByUserId).toHaveBeenCalled();
    });
    it('should call getDatasets on SalesforceDAO', () => {
      // Arrange
      const jobId = 'test123';
      const userId = 'token';

      // Act
      trainingService.selectJob(jobId, userId);

      // Assert
      expect(mockedSalesforceDAO.getDatasets).toHaveBeenCalled();
    });
    it('should call createTraining on TrainingDAO', () => {
      // Arrange
      const jobId = 'test123';
      const userId = 'token';

      // Act
      trainingService.selectJob(jobId, userId);

      // Assert
      expect(mockedTrainingDAO.createTraining).toHaveBeenCalled();
    });
  });
});
