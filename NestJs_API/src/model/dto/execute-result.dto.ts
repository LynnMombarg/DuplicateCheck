// Authors: Roward
// Jira-task: 175
// Sprint: 4
// Last modified: 05-06-2023

export class ExecuteResultDTO {
  isMatch: boolean;
  percentage: string;

  constructor(isMatch: boolean, percentage: string) {
    this.isMatch = isMatch;
    this.percentage = percentage;
  }
}
