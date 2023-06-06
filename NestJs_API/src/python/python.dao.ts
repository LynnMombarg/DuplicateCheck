// Authors: Marloes, Roward
// Jira-task: 107, 175
// Sprint: 2, 4
// Last modified: 26-05-2023

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TrainingDTO } from '../training/dto/training.dto';
import { ExecuteResultDTO } from '../model/dto/execute-result.dto';

@Injectable()
export class PythonDAO {
  async createModel(model: string) {
    await axios
      .post('http://duplicatecheck-python-backend-1:8000/create-model', {
        modelId: model,
      })
      .catch();
  }

  async deleteModel(modelId: string) {
    await axios
      .delete(
        `http://duplicatecheck-python-backend-1:8000/delete-model/${modelId}`,
      )
      .catch();
  }

  async saveTraining(modelId: string, dto: TrainingDTO) {
    await axios
      .put(
        `http://duplicatecheck-python-backend-1:8000/train-model/${modelId}`,
        {
          training: dto,
        },
      )
      .catch();
  }

  async executeModel(
    recordA: string,
    recordB: string,
    modelId: string,
  ): Promise<ExecuteResultDTO> {
    const response = await axios
      .post(
        `http://duplicatecheck-python-backend-1:8000/execute-model/${modelId}`,
        {
          record1: recordA,
          record2: recordB,
        },
      )
      .catch();
    return response.data;
  }
}
