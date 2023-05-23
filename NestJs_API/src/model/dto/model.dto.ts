// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

export class ModelDTO {
  modelName: string;
  modelId: string;
  tableName: string;
  modelDescription: string;
  orgId: string;

  constructor(
    modelName: string,
    modelId: string,
    tableName: string,
    modelDescription: string,
    orgId: string,
  ) {
    this.modelName = modelName;
    this.modelId = modelId;
    this.tableName = tableName;
    this.modelDescription = modelDescription;
    this.orgId = orgId;
  }
}
