import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { TrainingDao } from '../Training.dao';
import { TrainingService } from '../training.service';

describe('TrainingService', () => {
  let TrainingService: TrainingService;

  const mockedTrainingdao = {
    getNextRecords: jest.fn(),
    saveRecord: jest.fn(),
    checkForRecords: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        TrainingDao,
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
      .overrideProvider(mockedTrainingdao)
      .useValue(mockedTrainingdao)
      .compile();

    TrainingService = moduleRef.get<TrainingService>(TrainingService);
  });

  describe('getRecords', () => {
    it('should call getRecords on TrainingDao', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';

      // Act
      TrainingService.getRecords(trainingID, req);

      // Assert
      expect(mockedTrainingdao.getNextRecords).toHaveBeenCalledWith(trainingID);
    });
  });

  describe('giveAnswer', () => {
    it('should call giveAnswer on TrainingDao', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';
      const answer = false;

      // Act
      TrainingService.giveAnswer(false, trainingID, req);

      // Assert
      expect(mockedTrainingdao.saveRecord).toHaveBeenCalledWith(
        trainingID,
        req,
        answer,
      );
    });
  });
});
