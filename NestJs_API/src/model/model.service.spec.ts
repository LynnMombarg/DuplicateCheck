import { Test } from '@nestjs/testing';
import { ModelService } from './model.service';
import { ModelDAO } from './model.modelDAO';

describe('ModelService', () => {
  let service: ModelService;
  let dao: ModelDAO;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ModelService,
        {
          provide: ModelDAO,
          useValue: {
            deleteModel: jest.fn().mockResolvedValue([{ modelId: "id1", fileName: "id1.pkl", tableName: "Contacts" }, { modelId: "id2", fileName: "id2.pkl", tableName: "Leads" }]),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ModelService>(ModelService);
    dao = moduleRef.get<ModelDAO>(ModelDAO);
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('deleteModel', () => {
    it('should return an array of models', async () => {
      const expected = [{ modelId: "id1", fileName: "id1.pkl", tableName: "Contacts" }, { modelId: "id2", fileName: "id2.pkl", tableName: "Leads" }];
      
      jest.spyOn(dao, 'deleteModel').mockResolvedValue(expected);

      const result = await service.deleteModel("id3");

      expect(result).toEqual(expected);
    });
  });
});
