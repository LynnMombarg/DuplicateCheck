// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 15-05-2023

import { Test } from '@nestjs/testing';
import { TrainingDAO } from '../training.dao';
import { TrainingDTO } from '../dto/training.dto';
import { DatasetDTO } from '../dto/dataset.dto';
import { RecordDTO } from '../dto/record.dto';
import { TrainingDocument } from '../schema/training.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('TrainingDAO', () => {
  let trainingDAO: TrainingDAO;
  let trainingModel: Model<TrainingDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TrainingDAO,
        {
          provide: getModelToken('Training'),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            constructor: jest.fn(),
          },
        },
      ],
    }).compile();

    trainingDAO = moduleRef.get<TrainingDAO>(TrainingDAO);
    trainingModel = moduleRef.get(
      getModelToken('Training'),
    ) as Model<TrainingDocument>; // Type assertion
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
      expect(trainingModel.save).toHaveBeenCalled();
    });
  });
});
