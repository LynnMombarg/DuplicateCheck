// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import { RecordDTO } from './record.dto';

export class DatasetDTO {
  constructor(public records: RecordDTO[]) {}
}
