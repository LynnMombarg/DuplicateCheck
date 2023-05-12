// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingDAO } from './training.dao';
import { AuthDAO } from '../auth/auth.dao';
import { SalesforceDAO } from '../salesforce/salesforce.dao';
import { TrainingDTO } from './dto/training.dto';
import { v4 as uuid } from 'uuid';
import { DatasetDTO } from './dto/dataset.dto';
import { AuthDTO } from '../auth/auth.dto';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingDAO: TrainingDAO,
    private readonly authDAO: AuthDAO,
    private readonly salesforceDAO: SalesforceDAO,
  ) {}

  async selectJob(jobId, userId) {
    const tokens: Promise<AuthDTO> = this.authDAO.getTokensByUserId(userId);
    const records: Promise<DatasetDTO[]> = this.salesforceDAO.getDatasets(
      await tokens,
      jobId,
    );

    if ((await records).length < 2) {
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
}
