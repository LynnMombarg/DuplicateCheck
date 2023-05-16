// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 15-05-2023

import { Test } from '@nestjs/testing';
import { TrainingDAO } from '../training.dao';
import { TrainingDTO } from '../dto/training.dto';
import { DatasetDTO } from '../dto/dataset.dto';
import { RecordDTO } from '../dto/record.dto';
import { Training } from '../schema/training.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('TrainingDAO', () => {
  let trainingDAO: TrainingDAO;
  const mockedTrainingModel = {
    model: jest.fn(),
    save: jest.fn(),
  };

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
    it('should call save on Mongoose model', () => {
      // Arrange
      const expected = new TrainingDTO(
        'trainingId',
        'userId',
        new DatasetDTO([
          new RecordDTO(['1', 'Hoi']),
          new RecordDTO(['2', 'Doei']),
        ]),
        new DatasetDTO([
          new RecordDTO(['1', 'Hi']),
          new RecordDTO(['3', 'Doei']),
        ]),
        [true, false],
      );

      // Act
      trainingDAO.createTraining(expected);

      // Assert
      expect(mockedTrainingModel.save).toHaveBeenCalled();
    });
  });
});
