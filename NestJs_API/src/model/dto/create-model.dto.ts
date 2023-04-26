// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

export class CreateModelDto {
  modelName: string;
  tableName: string;
  modelDescription: string;
  token: string;

  constructor(
    modelName: string,
    tableName: string,
    modelDescription: string,
    token: string,
  ) {
    this.modelName = modelName;
    this.tableName = tableName;
    this.modelDescription = modelDescription;
    this.token = token;
  }
}
