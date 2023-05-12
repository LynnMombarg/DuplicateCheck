import { Injectable } from '@nestjs/common';
import { AuthDTO } from '../auth/auth.dto';
import { DatasetDTO } from '../training/dto/dataset.dto';
import { RecordDTO } from '../training/dto/record.dto';

@Injectable()
export class SalesforceDAO {
  async getDatasets(tokens: AuthDTO, jobId: string): Promise<DatasetDTO[]> {
    const datasetA = new DatasetDTO([
      new RecordDTO(['1', 'Hoi']),
      new RecordDTO(['2', 'Doei']),
    ]);
    const datasetB = new DatasetDTO([
      new RecordDTO(['1', 'Hi']),
      new RecordDTO(['3', 'Doei']),
    ]);
    return [datasetA, datasetB];
  }
}
