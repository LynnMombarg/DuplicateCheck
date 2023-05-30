// Authors: Silke, Marloes
// Jira-task: 123, 129, 130
// Sprint: 3
// Last modified: 22-05-2023

import { Test } from '@nestjs/testing';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDAO } from '../../auth/auth.dao';
import { AuthGuard } from '../../auth/auth.guard';
import { TrainingDAO } from '../training.dao';
import { TrainingService } from '../training.service';
import { SalesforceDAO } from '../../salesforce/salesforce.dao';
import { PythonDAO } from '../../python/python.dao';

describe('TrainingService', () => {
  let trainingservice: TrainingService;
  const training = {
    trainingId: 'training1',
    userId: '123',
    datasetA: {},
    datasetB: {},
    matches: {},
  };

  const mockedTrainingDAO = {
    createTraining: jest.fn(),
    getNextRecords: jest.fn(),
    saveAnswer: jest.fn(),
    checkForRecords: jest.fn(),
    getTraining: jest.fn(() => {
      return training;
    }),
  };
  const mockedAuthDAO = {
    getTokensByOrgId: jest.fn(() => {
      return { oegid: 'orgid' };
    }),
  };

  const mockedTrainingWithoutMatch = {
    _id: '6461fddec0437f4f44cbdb53',
    trainingId: 'trainingId',
    orgId: 'req.user.userId',
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
        {
          data: ['3', 'Doei'],
          _id: { $oid: '6461fcde17a65a5fbd3809e7' },
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
        {
          data: ['3', 'Doei'],
          _id: { $oid: '6461fcde17a65a5fbd3809e7' },
        },
      ],
      _id: { $oid: '6461fcde17a65a5fbd3809e4' },
    },
    matches: [],
    __v: 0,
  };

  const mockedSalesforceDAO = {
    getDatasets: jest.fn(() => {
      return mockedTrainingWithoutMatch;
    }),
  };

  const mockedPythonDAO = {
    saveTraining: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        TrainingDAO,
        TrainingService,
        SalesforceDAO,
        PythonDAO,
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
      .overrideProvider(TrainingDAO)
      .useValue(mockedTrainingDAO)
      .overrideProvider(AuthDAO)
      .useValue(mockedAuthDAO)
      .overrideProvider(SalesforceDAO)
      .useValue(mockedSalesforceDAO)
      .overrideProvider(PythonDAO)
      .useValue(mockedPythonDAO)
      .compile();
    trainingservice = moduleRef.get<TrainingService>(TrainingService);
  });

  describe('getRecords', () => {
    it('should call getRecords on TrainingDao', () => {
      // Arrange
      const trainingID = '123';
      const req = '123';

      // Act
      trainingservice.getRecords(trainingID);

      // Assert
      expect(mockedTrainingDAO.getTraining).toHaveBeenCalledWith(trainingID);
    });
  });

  describe('giveAnswer', () => {
    it('should call giveAnswer on TrainingDao', () => {
      // Arrange
      const trainingID = '123';
      const answer = false;
      const req = '123';

      // Act
      trainingservice.giveAnswer(false, trainingID);

      // Assert
      expect(mockedTrainingDAO.saveAnswer).toHaveBeenCalledWith(
        trainingID,
        answer,
      );
    });

    describe('selectJob', () => {
      it('should call getTokensByUserId on AuthDAO', () => {
        // Arrange
        const jobId = 'test123';
        const userId = 'token';
        const tableName = 'test';

        // Act
        trainingservice.selectJob(jobId, tableName, userId);

        // Assert
        expect(mockedAuthDAO.getTokensByOrgId).toHaveBeenCalled();
      });

      it('should call getDatasets on SalesforceDAO', async () => {
        // Arrange
        const jobId = 'test123';
        const orgId = 'token';
        const tableName = 'test';

        // Act
        await trainingservice.selectJob(jobId, tableName, orgId);

        // Assert
        expect(mockedSalesforceDAO.getDatasets).toHaveBeenCalled();
      });

      it('should call createTraining on TrainingDAO', async () => {
        // Arrange
        const jobId = 'test123';
        const orgId = 'token';
        const tableName = 'test';

        mockedTrainingDAO.createTraining.mockReturnValueOnce({ _id: '123' });
        // Act
        await trainingservice.selectJob(jobId, tableName, orgId);

        // Assert
        expect(mockedTrainingDAO.createTraining).toHaveBeenCalled();
      });
    });
  });

  describe('saveTraining', () => {
    it('should call saveTraining on PythonDAO', async () => {
      //Arrange
      const modelId = 'model1';
      const trainingId = 'training1';
      const training = {
        trainingId: 'training1',
        userId: '123',
        datasetA: {},
        datasetB: {},
        matches: {},
      };

      //Act
      await trainingservice.saveTraining(modelId, trainingId);

      // Assert
      expect(mockedPythonDAO.saveTraining).toHaveBeenCalledWith(
        modelId,
        training,
      );
    });

    it('should call getTraining on trainingDAO', () => {
      //Arrange
      const modelId = 'model1';
      const trainingId = 'training1';

      //Act
      trainingservice.saveTraining(modelId, trainingId);

      //Assert
      expect(mockedTrainingDAO.getTraining).toHaveBeenCalledWith(trainingId);
    });
  });
});
