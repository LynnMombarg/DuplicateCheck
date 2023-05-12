import { Test } from '@nestjs/testing';
import { TrainingService } from '../training.service';
import { TrainingController } from '../training.controller';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('TrainingController', () => {
  let trainingController: TrainingController;

  const mockedTrainingService = {
    getRecords: jest.fn(),
    giveAnswer: jest.fn(),
    checkForRecords: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [
        AuthService,
        JwtService,
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
});
