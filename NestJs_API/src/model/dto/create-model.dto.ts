// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

export class CreateModelDTO {
  modelName: string;
  tableName: string;
  modelDescription: string;

  constructor(modelName: string, tableName: string, modelDescription: string) {
    this.modelName = modelName;
    this.tableName = tableName;
    this.modelDescription = modelDescription;
  }
}
