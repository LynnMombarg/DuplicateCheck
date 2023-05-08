// Authors: Roward
// Jira-task: 110 - Models verwijderen uit database
// Sprint: 2
// Last modified: 08-05-2023

export class ModelDTO {
  modelName: string;
  modelId: string;
  tableName: string;
  userId: string;
  modelDescription: string;

  constructor(modelName, modelId, tableName, userId, modelDescription) {
    this.modelName = modelName;
    this.modelId = modelId;
    this.tableName = tableName;
    this.userId = userId;
    this.modelDescription = modelDescription;
  }
}
