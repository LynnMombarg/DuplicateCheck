// Authors: Roward
// Jira-task: 115
// Sprint: 3
// Last modified: 15-05-2023

export class JobDTO {
  jobName: string;
  jobId: string;
  constructor(jobName: string, jobId: string) {
    this.jobName = jobName;
    this.jobId = jobId;
  }
}
