// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

export class ModelDTO {
  modelName: string;
  fileName: string;
  tableName: string;
  modelDescription: string;
  userId: string;

  constructor(
    modelName: string,
    fileName: string,
    tableName: string,
    modelDescription: string,
    userId: string,
  ) {
    this.modelName = modelName;
    this.fileName = fileName;
    this.tableName = tableName;
    this.modelDescription = modelDescription;
    this.userId = userId;
  }
}
