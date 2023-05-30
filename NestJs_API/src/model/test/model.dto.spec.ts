import { Test, TestingModule } from '@nestjs/testing';
import { ModelDTO } from '../dto/model.dto';

describe('ModelDTO', () => {
  let modelDTO: ModelDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelDTO],
    }).compile();

    modelDTO = module.get<ModelDTO>(ModelDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of ModelDTO', () => {
      expect(modelDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of ModelDTO with parameters', () => {
      const modelDTO = new ModelDTO(
        'modelName',
        'modelId',
        'tableName',
        'modelDescription',
        'orgId',
      );
      expect(modelDTO).toBeDefined();
      expect(modelDTO.modelName).toEqual('modelName');
      expect(modelDTO.modelId).toEqual('modelId');
      expect(modelDTO.tableName).toEqual('tableName');
      expect(modelDTO.modelDescription).toEqual('modelDescription');
      expect(modelDTO.orgId).toEqual('orgId');
    });
  });
});
