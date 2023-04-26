export class ModelDto {
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
