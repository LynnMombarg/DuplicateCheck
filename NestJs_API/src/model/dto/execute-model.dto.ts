// Authors: Roward
// Jira-task: 175
// Sprint: 4
// Last modified: 26-05-2023

export class ExecuteModelDTO {
  tableName: string;
  recordId1: string;
  recordId2: string;
  modelId: string;

  constructor(
    tableName: string,
    recordId1: string,
    recordId2: string,
    modelId: string,
  ) {
    this.tableName = tableName;
    this.recordId1 = recordId1;
    this.recordId2 = recordId2;
    this.modelId = modelId;
  }
}
