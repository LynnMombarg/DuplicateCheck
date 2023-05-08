// Authors: Marloes, Roward
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 08-05-2023

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PythonDAO {
  async deleteModel(fileName: string) {
    await axios.delete('http://localhost:8000/delete-model/' + fileName);
  }
}