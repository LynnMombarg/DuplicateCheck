import { Test } from "@nestjs/testing";
import { TrainingController } from "../training.controller";
import { TrainingService } from "../training.service";

describe('TrainingController', () => {
    let trainingController: TrainingController;

    const mockedTrainingService = {
        saveTraining: jest.fn(),
      };

      beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
          controllers: [TrainingController],
          providers: [TrainingService],
        })
          .overrideProvider(TrainingService)
          .useValue(mockedTrainingService)
          .compile();
    
        trainingController = moduleRef.get<TrainingController>(TrainingController);
      });

    //   describe('saveTraining', () => {
    //     it('should call saveTraining on TrainingService', () => {
    //       // Arrange
    //       const json = { "modelId": "modelId", "trainingId": "trainingId", "userId": "userId" };
    
    //       // Act
    //       trainingController.saveTraining(json, 'test');
    
    //       // Assert
    //       expect(mockedTrainingService.saveTraining).toHaveBeenCalledWith(json, 'test');
    //     });
    //   });
})