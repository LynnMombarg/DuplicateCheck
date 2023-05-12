import { Test } from '@nestjs/testing';
import { TrainingController } from '../training.controller';
import { TrainingService } from '../training.service';
import { AuthGuard } from '../../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('TrainingController', () => {
  let trainingController: TrainingController;
  const mockedTrainingService = {
    selectJob: jest.fn(),
  };
  const mockedAuthGuard = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [TrainingService, AuthGuard, JwtService],
    })
      .overrideProvider(TrainingService)
      .useValue(mockedTrainingService)
      .overrideProvider(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();

    trainingController = moduleRef.get<TrainingController>(TrainingController);
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
