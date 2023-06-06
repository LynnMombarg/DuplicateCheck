// Authors: Roward
// Jira-task: 141
// Sprint: 3
// Last modified: 17-05-2023

import { DatasetDTO } from './dataset.dto';

export class CreateTrainingDTO {
  constructor(public jobId: string, public tableName: string, public modelId) {}
}
