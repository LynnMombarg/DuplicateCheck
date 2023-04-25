import { Injectable } from '@nestjs/common';

@Injectable()
export class PythonDao {
  createModel(fileName: string) {
    console.log('File ' + fileName + ' was created.');
  }
}
