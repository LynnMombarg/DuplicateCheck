// Authors: Marloes, Lynn, Silke
// Jira-task: 130, 137, 129
// Sprint: 3
// Last modified: 16-05-2023

import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingDAO } from './training.dao';
import { AuthDAO } from '../auth/auth.dao';
import { SalesforceDAO } from '../salesforce/salesforce.dao';
import { DatasetDTO } from './dto/dataset.dto';
import { AuthDTO } from '../auth/dto/auth.dto';
import { TrainingDTO } from './dto/training.dto';
import { v4 as uuid } from 'uuid';
import { PythonDAO } from '../python/python.dao';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingDAO: TrainingDAO,
    private readonly authDAO: AuthDAO,
    private readonly salesforceDAO: SalesforceDAO,
    private readonly pythonDAO: PythonDAO,
  ) {}

  async saveTraining(modelId: string, trainingId: string) {
    const training = await this.trainingDAO.getTraining(trainingId);
    if (training !== null) {
      await this.pythonDAO.saveTraining(modelId, training);
    }
  }

  async selectJob(jobId, tableName, orgId): Promise<string> {
    const tokens: AuthDTO = await this.authDAO.getTokensByOrgId(orgId);
    const records: DatasetDTO[] = await this.salesforceDAO.getDatasets(
      tokens,
      jobId,
      tableName,
    );
    const trainingId = uuid();

    if (records.length > 1) {
      const training: TrainingDTO = new TrainingDTO(
        trainingId,
        orgId,
        records[0],
        records[1],
        [],
      );
      this.trainingDAO.createTraining(training);
    } else {
      throw new NotFoundException();
    }
    return trainingId;
  }

  async getRecords(trainingId: string): Promise<DatasetDTO> {
    const training: TrainingDTO = await this.trainingDAO.getTraining(
      trainingId,
    );
    const lengthMatches = training.matches.length;
    const recordA = training.datasetA.records[lengthMatches];
    const recordB = training.datasetB.records[lengthMatches];
    return new DatasetDTO([recordA, recordB]);
  }

  async giveAnswer(answer: boolean, trainingID: string): Promise<void> {
    await this.trainingDAO.saveAnswer(trainingID, answer);
  }

  async checkForRecords(trainingId: string): Promise<boolean> {
    const training: TrainingDTO = await this.trainingDAO.getTraining(
      trainingId,
    );
    const lengthMatches = training.matches.length;
    const lengthDatasets = training.datasetA.records.length;
    return lengthDatasets > lengthMatches;
  }
}
