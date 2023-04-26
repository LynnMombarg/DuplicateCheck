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
