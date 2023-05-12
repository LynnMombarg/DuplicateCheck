// Authors: Marloes
// Jira-task: 130
// Sprint: 3
// Last modified: 12-05-2023

import {RecordDTO} from "../../../dist/training/RecordDTO";

export class DatasetDTO {
    constructor(records: RecordDTO[]) {
        this.records = records;
    }

    records: RecordDTO[];
}