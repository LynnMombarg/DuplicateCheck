// Authors: Silke, Marloes
// Jira-task: 129, 130
// Sprint: 3
// Last modified: 16-05-2023

import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { RecordDTO } from './dto/record.dto';
import { TrainingDAO } from './training.dao';
import { AuthDAO } from '../auth/auth.dao';
import { SalesforceDAO } from '../salesforce/salesforce.dao';
import { DatasetDTO } from './dto/dataset.dto';
import { AuthDTO } from '../auth/auth.dto';
import { TrainingDTO } from './dto/training.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingDAO: TrainingDAO,
    private readonly authDAO: AuthDAO,
    private readonly salesforceDAO: SalesforceDAO,
  ) {}

  async selectJob(jobId, userId) {
    const tokens: AuthDTO = await this.authDAO.getTokensByUserId(userId);
    const records: DatasetDTO[] = await this.salesforceDAO.getDatasets(
      tokens,
      jobId,
    );

    if (records.length > 1) {
      const training: TrainingDTO = new TrainingDTO(
        uuid(),
        userId,
        records[0],
        records[1],
        [],
      );
      this.trainingDAO.createTraining(training);
    } else {
      throw new NotFoundException();
    }
  }

  async getRecords(trainingID: string, @Req() req): Promise<DatasetDTO> {
    return this.trainingDAO.getNextRecords(trainingID);
  }

  async giveAnswer(
    answer: boolean,
    trainingID: string,
    @Req() req,
  ): Promise<void> {
    await this.trainingDAO.saveAnswer(trainingID, answer);
  }

  checkForRecords(trainingId: string, @Req() req): Promise<boolean> {
    return this.trainingDAO.checkForRecords(trainingId);
  }
}
