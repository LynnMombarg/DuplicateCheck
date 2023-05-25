// Authors: Marloes, Roward
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TrainingDTO } from '../training/dto/training.dto';

@Injectable()
export class PythonDAO {
  async createModel(modelId: string) {
    try {
      const response = await axios.post(
        'http://duplicatecheck-python-backend-1:8000/create-model',
        {
          modelId: modelId,
        },
      );
      console.log('Request successful:', response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteModel(modelId: string) {
    await axios
      .delete(
        'http://duplicatecheck-python-backend-1:8000/delete-model/' + modelId,
      )
      .catch(function (error) {
        if (error.response) {
          console.log(error.toJSON());
        }
      });
  }

  async saveTraining(modelId: string, training: TrainingDTO) {
    await axios
      .put(
        'http://duplicatecheck-python-backend-1:8000/train-model/' + modelId,
        {
          training: training,
        },
      )
      .catch(function (error) {
        if (error.response) {
          console.log(error.toJSON());
        }
      });
  }
}
