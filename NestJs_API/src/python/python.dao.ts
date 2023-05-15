// Authors: Marloes, Roward
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PythonDAO {
  async createModel(modelId: string): Promise<void> {
    console.log(modelId);
    await axios
      .post('http://localhost:8000/create-model', {
        modelId: modelId,
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
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
}
