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
