export class ModelDto {
  modelName: string;
  fileName: string;
  tableName: string;
  userId: string;

  constructor(
    modelName: string,
    fileName: string,
    tableName: string,
    userId: string,
  ) {
    this.modelName = modelName;
    this.fileName = fileName;
    this.tableName = tableName;
    this.userId = userId;
  }
}
