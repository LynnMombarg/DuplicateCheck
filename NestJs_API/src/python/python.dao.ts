// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PythonDao {
  async createModel(fileName: string) {
    await axios.post('http://http://localhost:8000//create-model', {
      fileName: fileName,
    });
  }
}
