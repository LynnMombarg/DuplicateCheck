// ...
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ModelController } from 'src/model/model.controller';
import { ModelService } from 'src/model/model.service';

const moduleMocker = new ModuleMocker(global);

describe('ModelController', () => {
  let controller: ModelController;
  let service: ModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelController],
      providers: [ModelService],
    }).compile();
  });

  describe('remove', () => {
    it('should delete an existing model', async () => {
      const expectedResult = { id: 2, fileName: "2.pkl", tableName: "Contacts" };

      jest.spyOn(service, 'deleteModel').mockResolvedValue(expectedResult);

      const result = await controller.delete(modelId);

      expect(service.deleteModel).toHaveBeenCalledWith(modelId);
      expect(result).toBe(expectedResult);
    });
  });
});
