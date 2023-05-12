// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { DatasetDTO } from './dataset.dto';

export class TrainingDTO {
  constructor(
    trainingId: string,
    userId: string,
    datasetA: DatasetDTO,
    datasetB: DatasetDTO,
    matches: boolean[],
  ) {
    this.trainingId = trainingId;
    this.userId = userId;
    this.datasetA = datasetA;
    this.datasetB = datasetB;
    this.matches = matches;
  }

  trainingId: string;
  userId: string;
  datasetA: DatasetDTO;
  datasetB: DatasetDTO;
  matches: boolean[];
}
