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
import { DatasetDTO } from '../dto/dataset.dto';
import { RecordDTO } from '../dto/record.dto';
import { TrainingDTO } from '../dto/training.dto';

describe('TrainingService', () => {
  let trainingservice: TrainingService;

  const mockedTrainingDAO = {
    createTraining: jest.fn(),
    getNextRecords: jest.fn(),
    saveAnswer: jest.fn(),
    checkForRecords: jest.fn(),
    getTraining: jest.fn(() => {
      return mockedTraining;
    }),
  };
  const mockedAuthDAO = {
    getTokensByOrgId: jest.fn(() => {
      return { oegid: 'orgid' };
    }),
  };

  const mockedTraining = new TrainingDTO(
    'trainingId',
    'req.user.orgId',
    'modelId',
    new DatasetDTO([new RecordDTO(['1', 'Hoi']), new RecordDTO(['2', 'Doei'])]),
    new DatasetDTO([new RecordDTO(['1', 'Hi']), new RecordDTO(['3', 'Doei'])]),
    [false, true],
  );

  const mockedSalesforceDAO = {
    getDatasets: jest
      .fn()
      .mockResolvedValue([
        new DatasetDTO([new RecordDTO(['hi']), new RecordDTO(['hi'])]),
        new DatasetDTO([new RecordDTO(['hi']), new RecordDTO(['hi'])]),
      ]),
    getFields: jest.fn(),
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
        const modelId = 'test';

        // Act
        trainingservice.selectJob(jobId, tableName, userId, modelId);

        // Assert
        expect(mockedAuthDAO.getTokensByOrgId).toHaveBeenCalled();
      });

      it('should call getDatasets on SalesforceDAO', async () => {
        // Arrange
        const jobId = 'test123';
        const orgId = 'token';
        const tableName = 'test';
        const modelId = 'test';

        // Act
        await trainingservice.selectJob(jobId, tableName, orgId, modelId);

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
        await trainingservice.selectJob(jobId, tableName, orgId, 'modelId');

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

      //Act
      await trainingservice.saveTraining(modelId, trainingId);

      // Assert
      expect(mockedPythonDAO.saveTraining).toHaveBeenCalledWith(
        modelId,
        mockedTraining,
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

  describe('checkForRecords', () => {
    it('should call getTraining on trainingDAO', () => {
      // Arrange
      const trainingId = 'trainingId';

      // Act
      trainingservice.checkForRecords(trainingId);

      // Assert
      expect(mockedTrainingDAO.getTraining).toHaveBeenCalledWith(trainingId);
    });
  });
});
