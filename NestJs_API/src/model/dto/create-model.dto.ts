export class CreateModelDto {
  modelName: string;
  tableName: string;
  token: string;

  constructor(modelName: string, tableName: string, token: string) {
    this.modelName = modelName;
    this.tableName = tableName;
    this.token = token;
  }
}
