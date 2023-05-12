export class JobDTO {
  jobName: string;
  jobId: string;
  constructor(jobName: string, jobId: string) {
    this.jobName = jobName;
    this.jobId = jobId;
  }
}
