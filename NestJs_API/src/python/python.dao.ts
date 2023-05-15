// Authors: Marloes, Roward
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TrainingDTO } from 'src/training/training.dto';

@Injectable()
export class PythonDAO {

  async createModel(modelId: string) {
    await axios
      .post('http://localhost:8000/create-model', {
        modelId: modelId,
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.toJSON());
        }
      });
  }

  async deleteModel(modelId: string) {
    await axios
      .post('http://localhost:8000/delete-model', {
        modelId: modelId,
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.toJSON());
        }
      });
  }

  async saveTraining(modelId: string, training: TrainingDTO) {
    await axios
      .post('http://localhost:8000/train-model/' + modelId, {
        training: training,
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.toJSON());
        }
      });
}
}
