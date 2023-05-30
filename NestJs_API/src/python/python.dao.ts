// Authors: Marloes, Roward
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TrainingDTO } from '../training/dto/training.dto';

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
}
