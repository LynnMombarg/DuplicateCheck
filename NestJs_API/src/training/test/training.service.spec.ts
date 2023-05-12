import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { TrainingDAO } from '../TrainingDAO';
import { TrainingService } from '../training.service';

describe('TrainingService', () => {
  let trainingservice: TrainingService;

  const mockedTrainingDAO = {
    getNextRecords: jest.fn(),
    saveRecord: jest.fn(),
    checkForRecords: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        TrainingDAO,
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
      .overrideProvider(mockedTrainingDAO)
      .useValue(mockedTrainingDAO)
      .compile();

    trainingservice = moduleRef.get<TrainingService>(TrainingService);
  });

  describe('getRecords', () => {
    it('should call getRecords on TrainingDAO', () => {
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
    it('should call giveAnswer on TrainingDAO', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';
      const answer = false;

      // Act
      trainingservice.giveAnswer(false, trainingID, req);

      // Assert
      expect(mockedTrainingDAO.saveRecord).toHaveBeenCalledWith(
        trainingID,
        req,
        answer,
      );
    });
  });
});
