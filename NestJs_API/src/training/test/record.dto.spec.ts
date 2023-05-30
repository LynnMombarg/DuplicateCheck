import { Test, TestingModule } from '@nestjs/testing';
import { RecordDTO } from '../dto/record.dto';

describe('RecordDTO', () => {
  let recordDTO: RecordDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordDTO],
    }).compile();

    recordDTO = module.get<RecordDTO>(RecordDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of RecordDTO', () => {
      expect(recordDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of RecordDTO with parameters', () => {
      const recordDTO = new RecordDTO(['test']);
      expect(recordDTO).toBeDefined();
      expect(recordDTO.data).toEqual(['test']);
    });
  });
});
