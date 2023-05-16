// Authors: Silke, Marloes
// Jira-task: 123, 129, 130
// Sprint: 3
// Last modified: 16-05-2023

import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { TrainingDAO } from '../training.dao';
import { TrainingService } from '../training.service';
import { SalesforceDAO } from "../../salesforce/salesforce.dao";


describe('TrainingService', () => {
  let trainingservice: TrainingService;

  const mockedTrainingDAO = {
    createTraining: jest.fn(),
    getNextRecords: jest.fn(),
    saveAnswer: jest.fn(),
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
        SalesforceDAO,
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
      .useValue(mockedTrainingDAO)
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(SalesforceDAO)
      .useValue(mockedSalesforceDAO)
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
      expect(mockedTrainingDAO.getNextRecords).toHaveBeenCalledWith(trainingID);
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
      expect(mockedTrainingDAO.saveAnswer).toHaveBeenCalledWith(
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
      trainingservice.selectJob(jobId, userId);

      // Assert
      expect(mockedAuthDAO.getTokensByUserId).toHaveBeenCalled();
    });

    it('should call getDatasets on SalesforceDAO', () => {
      // Arrange
      const jobId = 'test123';
      const userId = 'token';

      // Act
      trainingservice.selectJob(jobId, userId);

      // Assert
      expect(mockedSalesforceDAO.getDatasets).toHaveBeenCalled();
    });

    it('should call createTraining on TrainingDAO', () => {
      // Arrange
      const jobId = 'test123';
      const userId = 'token';

      // Act
      trainingservice.selectJob(jobId, userId);

      // Assert
      expect(mockedTrainingDAO.createTraining).toHaveBeenCalled();
    });
  });
});

});
