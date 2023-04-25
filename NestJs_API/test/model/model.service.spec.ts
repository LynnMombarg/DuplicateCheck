import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { ModelController } from 'src/model/model.controller';
import { ModelDAO } from 'src/model/model.modelDAO';
import { ModelDTO } from 'src/model/model.modelDTO';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('ModelController', () => {
  let controller: ModelController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ModelController],
    })
    .useMocker((token) => {
      const results = [new ModelDTO()];
      if (token === ModelDAO) {
        return { deleteModel: jest.fn().mockResolvedValue(results) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();
    
    controller = moduleRef.get(ModelController);
  });
  
  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });
});