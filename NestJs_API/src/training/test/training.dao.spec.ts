// Authors: Marloes, Lynn
// Jira-task: 130, 137
// Sprint: 3
// Last modified: 22-05-2023

import { Test } from '@nestjs/testing';
import { TrainingDAO } from '../training.dao';
import { Training } from '../schema/training.schema';
import { getModelToken } from '@nestjs/mongoose';
import { TrainingDTO } from '../dto/training.dto';
import { DatasetDTO } from '../dto/dataset.dto';
import { RecordDTO } from '../dto/record.dto';

describe('TrainingDAO', () => {
  let trainingDAO: TrainingDAO;
  const mockedTrainingModel = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    create: jest.fn(),
  };

  const mockedTraining = new TrainingDTO(
    'trainingId',
    'req.user.orgId',
    'modelId',
    new DatasetDTO([new RecordDTO(['1', 'Hoi']), new RecordDTO(['2', 'Doei'])]),
    new DatasetDTO([new RecordDTO(['1', 'Hi']), new RecordDTO(['3', 'Doei'])]),
    [false, true],
  );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TrainingDAO,
        {
          provide: getModelToken(Training.name),
          useValue: mockedTrainingModel,
        },
      ],
    }).compile();

    trainingDAO = moduleRef.get<TrainingDAO>(TrainingDAO);
  });

  describe('createModel', () => {
    it('should call create on Mongoose model', () => {
      // Act
      trainingDAO.createTraining(mockedTraining);

      // Assert
      expect(mockedTrainingModel.create).toHaveBeenCalledWith(mockedTraining);
    });
  });

  describe('saveAnswer', () => {
    it('should save the answer', async () => {
      // Arrange
      const trainingsid = 'trainingId';
      const answer = true;

      mockedTrainingModel.updateOne.mockResolvedValueOnce(mockedTraining);

      // Act
      trainingDAO.saveAnswer(trainingsid, answer);

      // Assert
      expect(mockedTrainingModel.updateOne).toHaveBeenCalledWith(
        { trainingId: 'trainingId' },
        { $push: { matches: { $each: [answer] } } },
      );
    });
  });

  describe('getTraining', () => {
    it('should call findOne on Mongoose model', () => {
      //Arrange
      const trainingId = '123';

      //Act
      trainingDAO.getTraining(trainingId);

      //Assert
      expect(mockedTrainingModel.findOne).toHaveBeenCalled();
    });
  });
});
