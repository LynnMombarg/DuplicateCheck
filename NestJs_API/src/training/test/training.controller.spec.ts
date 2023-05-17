// Authors: Silke, Marloes
// Jira-task: 123, 129, 130
// Sprint: 3
// Last modified: 16-05-2023

import { Test } from '@nestjs/testing';
import { TrainingController } from '../training.controller';
import { TrainingService } from '../training.service';
import { AuthGuard } from '../../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';

describe('TrainingController', () => {
  let trainingController: TrainingController;

  const mockedTrainingService = {
    getRecords: jest.fn(),
    giveAnswer: jest.fn(),
    checkForRecords: jest.fn(),
    selectJob: jest.fn(),
  };
  const mockedAuthGuard = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [
        AuthService,
        JwtService,
        AuthGuard,
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
      .overrideProvider(TrainingService)
      .useValue(mockedTrainingService)
      .overrideProvider(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();

    trainingController = moduleRef.get<TrainingController>(TrainingController);
  });

  describe('getRecords', () => {
    it('should call getRecords on TrainingService', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';

      // Act
      trainingController.getRecords(trainingID, req);

      // Assert
      expect(mockedTrainingService.getRecords).toHaveBeenCalledWith(
        trainingID,
        req,
      );
    });
  });

  describe('giveAnswer', () => {
    it('should call giveAnswer on TrainingService', () => {
      // Arrange
      const answer = true;
      const trainingID = '123';
      const req = '123';

      // Act
      trainingController.giveAnswer(answer, trainingID, req);

      // Assert
      expect(mockedTrainingService.giveAnswer).toHaveBeenCalledWith(
        answer,
        trainingID,
        req,
      );
    });
  });

  describe('checkForRecords', () => {
    it('should call checkForRecords on TrainingService', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';

      // Act
      trainingController.checkForRecords(trainingID, req);

      // Assert
      expect(mockedTrainingService.checkForRecords).toHaveBeenCalledWith(
        trainingID,
        req,
      );
    });
  });

  describe('selectJob', () => {
    it('should call selectJob on TrainingService', () => {
      // Arrange
      const jobId = 'test123';
      const userId = 'userId';
      const req = { user: { userId: userId } };

      // Act
      trainingController.selectJob(jobId, req);

      // Assert
      expect(mockedTrainingService.selectJob).toHaveBeenCalledWith(
        jobId,
        userId,
      );
    });
  });
});
