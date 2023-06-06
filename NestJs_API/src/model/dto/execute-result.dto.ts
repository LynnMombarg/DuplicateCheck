// Authors: Roward
// Jira-task: 175
// Sprint: 4
// Last modified: 05-06-2023

export class ExecuteResultDTO {
  is_match: boolean;
  percentage: string;

  constructor(is_match: boolean, percentage: string) {
    this.is_match = is_match;
    this.percentage = percentage;
  }
}
