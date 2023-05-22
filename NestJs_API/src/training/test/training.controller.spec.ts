// Authors: Silke, Marloes
// Jira-task: 123, 129, 130
// Sprint: 3
// Last modified: 22-05-2023
import { Test } from '@nestjs/testing';
import { TrainingController } from '../training.controller';
import { TrainingService } from '../training.service';
import { AuthGuard } from '../../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { AuthDAO } from '../../auth/auth.dao';
import { AnswerDTO } from '../dto/answer.dto';
import { CreateTrainingDTO } from '../dto/create-training.dto';

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

      // Act
      trainingController.getRecords(trainingID);

      // Assert
      expect(mockedTrainingService.getRecords).toHaveBeenCalledWith(trainingID);
    });
  });

  describe('giveAnswer', () => {
    it('should call giveAnswer on TrainingService', () => {
      // Arrange
      const answer = new AnswerDTO('123', true);

      // Act
      trainingController.giveAnswer(answer);

      // Assert
      expect(mockedTrainingService.giveAnswer).toHaveBeenCalledWith(
        answer.answer,
        answer.trainingId,
      );
    });
  });

  describe('checkForRecords', () => {
    it('should call checkForRecords on TrainingService', () => {
      // Arrange
      const trainingID = '123';

      // Act
      trainingController.checkForRecords(trainingID);

      // Assert
      expect(mockedTrainingService.checkForRecords).toHaveBeenCalledWith(
        trainingID,
      );
    });
  });

  describe('selectJob', () => {
    it('should call selectJob on TrainingService', () => {
      // Arrange
      const CreateTraining = new CreateTrainingDTO('jobId', 'tableName');

      const req = { user: { userId: 'userId' } };

      // Act
      trainingController.selectJob(CreateTraining, req);

      // Assert
      expect(mockedTrainingService.selectJob).toHaveBeenCalledWith(
        CreateTraining.jobId,
        CreateTraining.tableName,
        req.user.userId,
      );
    });
  });
});
