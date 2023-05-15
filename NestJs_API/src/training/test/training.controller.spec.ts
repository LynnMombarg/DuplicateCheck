import { Test, TestingModule } from "@nestjs/testing";
import { TrainingController } from "../training.controller";
import { TrainingService } from "../training.service";
import { TrainingDAO } from "../training.dao";
import { PythonDAO } from "../../python/python.dao";

describe('TrainingController', () => {
    let trainingController: TrainingController;

    const mockedTrainingService = {
      saveTraining: jest.fn(),
    };

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
          }],
        })
        .overrideProvider(TrainingService)
          .useValue(mockedTrainingService)
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
    
          // Act
          trainingController.saveTraining(json, '123');
    
          // Assert
          expect(mockedTrainingService.saveTraining).toHaveBeenCalledWith("modelId", "trainingId", '123');
        });
      });
})