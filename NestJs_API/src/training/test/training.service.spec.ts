// Authors: Silke, Marloes
// Jira-task: 123, 129, 130
// Sprint: 3
// Last modified: 22-05-2023

import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { TrainingDAO } from '../training.dao';
import { TrainingService } from '../training.service';
import { SalesforceDAO } from '../../salesforce/salesforce.dao';
import { PythonDAO } from 'src/python/python.dao';

describe('TrainingService', () => {
  let trainingservice: TrainingService;

  const mockedTrainingDAO = {
    createTraining: jest.fn(),
    getNextRecords: jest.fn(),
    saveAnswer: jest.fn(),
    checkForRecords: jest.fn(),
    getTraining: jest.fn();
  };
  const mockedAuthDAO = {
    getTokensByUserId: jest.fn(),
  };
  const mockedSalesforceDAO = {
    getDatasets: jest.fn(() => {
      return ['test', 'test'];
    }),
  };
  const mockedPythonDAO = {
    saveTraining: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        TrainingDAO,
        TrainingService,
        SalesforceDAO,
        PythonDAO,
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
      .overrideProvider(PythonDAO)
      .useValue(mockedPythonDAO)
      .compile();
    trainingservice = moduleRef.get<TrainingService>(TrainingService);
  });

  describe('getRecords', () => {
    it('should call getRecords on TrainingDao', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';

      // Act
      trainingservice.getRecords(trainingID);

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
      trainingservice.giveAnswer(false, trainingID);

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
        const tableName = 'test';

        // Act
        trainingservice.selectJob(jobId, tableName, userId);

        // Assert
        expect(mockedAuthDAO.getTokensByUserId).toHaveBeenCalled();
      });

      it('should call getDatasets on SalesforceDAO', () => {
        // Arrange
        const jobId = 'test123';
        const userId = 'token';
        const tableName = 'test';

        // Act
        trainingservice.selectJob(jobId, tableName, userId);

        // Assert
        expect(mockedSalesforceDAO.getDatasets).toHaveBeenCalled();
      });

      it('should call createTraining on TrainingDAO', () => {
        // Arrange
        const jobId = 'test123';
        const userId = 'token';
        const tableName = 'test';

        // Act
        trainingservice.selectJob(jobId, tableName, userId);

        // Assert
        expect(mockedTrainingDAO.createTraining).toHaveBeenCalled();
      });
    });
  });


  describe('saveTraining', () => {
    it('should call saveTraining on PythonDAO', () => {
      //Arrange
      const modelId = 'model1';
      const trainingId = 'training1';
      const userId = '123';
      const training = { 'trainingId': trainingId, 'userId': userId, 'datasetA': { }, 'datasetB': { }, 'matches': { } };

      //Act
      trainingservice.saveTraining(modelId, trainingId, userId);

      // Assert
      expect(mockedPythonDAO.saveTraining).toHaveBeenCalledWith(modelId, training)
    });

    it('should call getTraining on trainingDAO', () => {
      //Arrange
      const modelId = 'model1';
      const trainingId = 'training1';
      const userId = '123';

      //Act
      trainingservice.saveTraining(modelId, trainingId, userId);

      //Assert
      expect(mockedTrainingDAO.getTraining).toHaveBeenCalledWith(trainingId);
    })
  })
  
});
