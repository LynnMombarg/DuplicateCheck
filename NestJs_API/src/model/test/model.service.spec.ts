// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { ModelService } from '../model.service';
import { Test } from '@nestjs/testing';

describe('ModelService', () => {
  let modelService: ModelService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({});
  });
});
