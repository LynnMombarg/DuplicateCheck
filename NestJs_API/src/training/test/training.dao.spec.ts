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
    findOne: jest.fn(),
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

  describe('getNextRecords', () => {
    it ('it should fetch records from the mongoose model', async () => {

      const trainingsid = 'trainingId';

      await trainingDAO.getNextRecords(trainingsid);

      expect(mockedTrainingModel.findOne).toHaveBeenCalledWith({ trainingId: trainingsid });

  });

    describe('getNextRecords', () => {
      it('should fetch records from the mongoose model', async () => {
        // Arrange
        const trainingsid = 'trainingId';
        const mockTraining = {
          _id: '6461fddec0437f4f44cbdb53',
          trainingId: 'trainingId',
          userId: 'req.user.userId',
          datasetA: {
            records: [
              {
                data: ['1', 'Hoi'],
                _id: { $oid: '6461fcde17a65a5fbd3809e2' },
              },
              {
                data: ['2', 'Doei'],
                _id: { $oid: '6461fcde17a65a5fbd3809e3' },
              },
            ],
            _id: { $oid: '6461fcde17a65a5fbd3809e1' },
          },
          datasetB: {
            records: [
              {
                data: ['1', 'Hi'],
                _id: { $oid: '6461fcde17a65a5fbd3809e5' },
              },
              {
                data: ['3', 'Doei'],
                _id: { $oid: '6461fcde17a65a5fbd3809e6' },
              },
            ],
            _id: { $oid: '6461fcde17a65a5fbd3809e4' },
          },
          matches: [],
          __v: 0,
        };

        mockedTrainingModel.findOne.mockResolvedValueOnce(mockTraining);

        // Act
        const result = await trainingDAO.getNextRecords(trainingsid);

        // Assert
        expect(mockedTrainingModel.findOne).toHaveBeenCalledWith({ trainingId: trainingsid });
        expect(result).toEqual([
          {
            data: ['1', 'Hoi'],
            _id: { $oid: '6461fcde17a65a5fbd3809e2' },
          },
          {
            data: ['1', 'Hi'],
            _id: { $oid: '6461fcde17a65a5fbd3809e5' },
          },
        ]);
      });
});
  });
});
