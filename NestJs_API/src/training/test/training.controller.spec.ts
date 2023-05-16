// Authors: Marloes, Lynn
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Test, TestingModule } from "@nestjs/testing";
import { TrainingController } from "../training.controller";
import { TrainingService } from "../training.service";
import { AuthGuard } from '../../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { TrainingDAO } from "../training.dao";
import { PythonDAO } from "../../python/python.dao";

describe('TrainingController', () => {
    let trainingController: TrainingController;

    const mockedTrainingService = {
      saveTraining: jest.fn(),
      selectJob: jest.fn(),
    };
    const mockedAuthGuard = {};

      beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
          controllers: [TrainingController],
          providers: [
            TrainingService,
          {
            provide: TrainingDAO,
            useValue: jest.fn(),
          },
          {
            provide: PythonDAO,
            useValue: jest.fn(),
          },
          AuthGuard, JwtService],
        })
        .overrideProvider(TrainingService)
        .useValue(mockedTrainingService)
        .overrideProvider(AuthGuard)
        .useValue(mockedAuthGuard)
        .compile();
    
        trainingController = moduleRef.get<TrainingController>(TrainingController);
      });

      it('should be defined', () => {
        expect(trainingController).toBeDefined();
      });

      describe('saveTraining', () => {
        it('should call saveTraining on TrainingService', () => {
          // Arrange
          const json = { "modelId": "modelId", "trainingId": "trainingId" };
          const req = { user: { userId: "123" } };
    
          // Act
          trainingController.saveTraining(json, req);
    
          // Assert
          expect(mockedTrainingService.saveTraining).toHaveBeenCalledWith("modelId", "trainingId", '123');
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
})



