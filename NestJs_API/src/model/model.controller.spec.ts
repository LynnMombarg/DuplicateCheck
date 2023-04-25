import { ModelController } from './model.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { PythonModule } from '../python/python.module';
import { LoginModule } from '../login/login.module';

describe('ModelController', () => {
  let controller: ModelController;
  let service: ModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PythonModule, LoginModule],
      controllers: [ModelController],
      providers: [ModelService],
    }).compile();

    controller = module.get<ModelController>(ModelController);
    service = module.get<ModelService>(ModelService);
  });

  describe('createModel', () => {
    const model = new CreateModelDto('modelName', 'tableName', 'token');

    it('should call createModel on the service', () => {
      let wasCalled = false;
      jest.spyOn(service, 'createModel').mockImplementation(() => {
        wasCalled = true;
      });
      controller.createModel(model);
      expect(wasCalled).toBe(true);
    });
  });
});
