// Authors: Marloes, Lynn, Silke
// Jira-task: 130, 137, 129
// Sprint: 3
// Last modified: 16-05-2023

import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { RecordDTO } from './dto/record.dto';
import { TrainingDAO } from './training.dao';
import { AuthDAO } from '../auth/auth.dao';
import { SalesforceDAO } from '../salesforce/salesforce.dao';
import { DatasetDTO } from './dto/dataset.dto';
import { AuthDTO } from '../auth/auth.dto';
import { PythonDAO } from 'src/python/python.dao';
import { TrainingDTO } from './dto/training.dto';
import { v4 as uuid } from 'uuid';

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
    const fields = await this.salesforceDAO.getFields(tableName, tokens);
    let records: DatasetDTO[];
    try {
      records = await this.salesforceDAO.getDatasets(
        tokens,
        jobId,
        fields,
        tableName,
      );
    } catch (e) {
      throw new NotFoundException();
    }
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

  async getRecords(trainingID: string): Promise<DatasetDTO> {
    return this.trainingDAO.getNextRecords(trainingID);
  }

  async giveAnswer(answer: boolean, trainingID: string): Promise<void> {
    await this.trainingDAO.saveAnswer(trainingID, answer);
  }

  checkForRecords(trainingId: string): Promise<boolean> {
    return this.trainingDAO.checkForRecords(trainingId);
  }
}
