import { Test, TestingModule } from '@nestjs/testing';
import { AnswerDTO } from '../dto/answer.dto';

describe('AnswerDTO', () => {
  let answerDTO: AnswerDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerDTO],
    }).compile();

    answerDTO = module.get<AnswerDTO>(AnswerDTO);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of AnswerDTO', () => {
      expect(answerDTO).toBeDefined();
    });
  });

  describe('constructor with parameters', () => {
    it('should create an instance of AnswerDTO with parameters', () => {
      const answerDTO = new AnswerDTO('trainingId', true);
      expect(answerDTO).toBeDefined();
      expect(answerDTO.trainingId).toEqual('trainingId');
      expect(answerDTO.answer).toEqual(true);
    });
  });
});
