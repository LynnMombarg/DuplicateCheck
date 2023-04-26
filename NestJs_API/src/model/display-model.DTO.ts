export class ModelDTO {
  modelName: string;
  fileName: string;
  tableName: string;
  userId: string;
  modelDescription: string;

  constructor(modelName, fileName, tableName, userId, modelDescription) {
    this.modelName = modelName;
    this.fileName = fileName;
    this.tableName = tableName;
    this.userId = userId;
    this.modelDescription = modelDescription;
  }
}
