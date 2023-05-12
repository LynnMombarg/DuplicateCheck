// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { RecordDto } from 'src/training/dto/record.dto';

export class DatasetDTO {
  constructor(records: RecordDto[]) {
    this.records = records;
  }

  records: RecordDto[];
}
