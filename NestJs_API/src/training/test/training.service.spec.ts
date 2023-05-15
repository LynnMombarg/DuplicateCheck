// Authors: Silke
// Jira-task: 123
// Sprint: 3
// Last modified: 15-05-2023

// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { TrainingDAO } from '../training.dao';
import { TrainingService } from '../training.service';

describe('TrainingService', () => {
  let trainingservice: TrainingService; // use lowercase for the variable name

  const mockedTrainingdao = {
    getNextRecords: jest.fn(),
    saveRecord: jest.fn(),
    checkForRecords: jest.fn(),
  };

describe('TrainingService', () => {
  let trainingService: TrainingService;

  const mockedTrainingDAO = {
    createTraining: jest.fn(),
    getNextRecords: jest.fn(),
    saveRecord: jest.fn(),
    checkForRecords: jest.fn(),
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

      providers: [
        AuthService,
        JwtService,
        TrainingDAO,
        TrainingService,
        
        {
          provide: AuthDAO,
          useValue: jest.fn(),
        },
        {
          provide: AuthGuard,
          useValue: jest.fn(),
        },
      ],
    })
      .overrideProvider(TrainingDAO)
      .useValue(mockedTrainingdao)
      .compile();
    trainingservice = moduleRef.get<TrainingService>(TrainingService);
  });

  describe('getRecords', () => {
    it('should call getRecords on TrainingDao', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';

      // Act
      trainingservice.getRecords(trainingID, req);

      // Assert
      expect(mockedTrainingdao.getNextRecords).toHaveBeenCalledWith(trainingID);
    });
  });

  describe('giveAnswer', () => {
    it('should call giveAnswer on TrainingDao', () => {
      // Arrange
      const trainingID = '123';
      const answer = false;
      const req = '123';

      // Act
      trainingservice.giveAnswer(false, trainingID, req);

      // Assert
      expect(mockedTrainingdao.saveRecord).toHaveBeenCalledWith(
        trainingID,
        answer,
      );
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
