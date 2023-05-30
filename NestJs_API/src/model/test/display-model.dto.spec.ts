// Authors:  Diederik
// Jira-task: 183
// Sprint: 4
// Last modified: 30-05-2023

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
