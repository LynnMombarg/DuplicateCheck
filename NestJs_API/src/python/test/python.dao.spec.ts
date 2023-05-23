// Authors: Marloes, Roward, Silke
// Jira-task: 157 - nestjs tests schrijven python.dao
// Sprint: 3
// Last modified: 22-05-2023

import { Test } from '@nestjs/testing';
import axios from 'axios';
import { PythonDAO } from '../python.dao';

jest.mock('axios');

describe('PythonDAO', () => {
  const mockedResponse = { data: 'Mocked response' };
  const mockedaxios = axios as jest.Mocked<typeof axios>;

  let pythondao: PythonDAO;

  beforeEach(async () => {
    mockedaxios.post.mockResolvedValue(mockedResponse);
    mockedaxios.delete.mockResolvedValue(undefined);

    const moduleRef = await Test.createTestingModule({
      providers: [PythonDAO],
    }).compile();

    pythondao = moduleRef.get<PythonDAO>(PythonDAO);
  });

  describe('createModel', () => {
    it('should perform an axios.post request, with the given modelId', async () => {
      // Arrange
      const modelId = 'test.txt';

      // Act
      await pythondao.createModel(modelId);

      // Assert
      expect(mockedaxios.post).toBeCalledWith(
        'http://duplicatecheck-python-backend-1:8000/create-model',
        { modelId: modelId },
      );
    });
  });

  describe('deleteModel', () => {
    it('should perform an axios.delete request with the correct filename', async () => {
      // Arrange
      const fileName = 'test.txt';

      // Act
      await pythondao.deleteModel(fileName);

      // Assert
      expect(mockedaxios.delete).toBeCalledWith(
        'http://duplicatecheck-python-backend-1:8000/delete-model/' + fileName,
      );
    });
  });
});
