import { Test, TestingModule } from '@nestjs/testing';
import { DatasetDTO } from '../dto/dataset.dto';
import { RecordDTO } from '../dto/record.dto';

describe('DatasetDTO', () => {
  let datasetDTO: DatasetDTO;
  let recordDTO: RecordDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatasetDTO, RecordDTO],
    }).compile();

    datasetDTO = module.get<DatasetDTO>(DatasetDTO);
    recordDTO = module.get<RecordDTO>(RecordDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of DatasetDTO', () => {
      expect(datasetDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of DatasetDTO with parameters', () => {
      const datasetDTO = new DatasetDTO([recordDTO]);
      expect(datasetDTO).toBeDefined();
      expect(datasetDTO.records).toEqual([recordDTO]);
    });
  });
});
