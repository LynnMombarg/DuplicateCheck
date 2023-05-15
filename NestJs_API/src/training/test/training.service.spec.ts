import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { TrainingDao } from '../training.dao';
import { TrainingService } from '../training.service';

describe('TrainingService', () => {
  let trainingservice: TrainingService; // use lowercase for the variable name

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
      const req = '123';
      const answer = false;

      // Act
      trainingservice.giveAnswer(false, trainingID, req);

      // Assert
      expect(mockedTrainingdao.saveRecord).toHaveBeenCalledWith(
        trainingID,
        req,
        answer,
      );
    });
  });
});
