import { Test, TestingModule } from '@nestjs/testing';
import { DisplayDTO } from '../dto/display-model.dto';

describe('DisplayDTO', () => {
  let displayDTO: DisplayDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisplayDTO],
    }).compile();

    displayDTO = module.get<DisplayDTO>(DisplayDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of DisplayDTO', () => {
      expect(displayDTO).toBeDefined();
    });
  });
});
