// Authors: Marloes, Lynn
// Jira-task: 130, 137
// Sprint: 3
// Last modified: 22-05-2023

import { Test } from '@nestjs/testing';
import { TrainingDAO } from '../training.dao';
import { Training } from '../schema/training.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('TrainingDAO', () => {
  let trainingDAO: TrainingDAO;
  const mockedTrainingModel = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    create: jest.fn(),
  };

  const mockedTrainingWithoutMatch = {
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

  const mockTrainingWithOneMatch = {
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
    matches: [true],
    __v: 0,
  };

  const mockTrainingWithAllMatches = {
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
    matches: [true, true],
    __v: 0,
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
    it('should call create on Mongoose model', () => {
      // Act
      trainingDAO.createTraining(mockedTrainingWithoutMatch);

      // Assert
      expect(mockedTrainingModel.create).toHaveBeenCalledWith(
        mockedTrainingWithoutMatch,
      );
    });
  });

  describe('saveAnswer', () => {
    it('should save the answer', async () => {
      // Arrange
      const trainingsid = 'trainingId';
      const answer = true;

      mockedTrainingModel.updateOne.mockResolvedValueOnce(
        mockedTrainingWithoutMatch,
      );

      // Act
      const result = await trainingDAO.saveAnswer(trainingsid, answer);

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
