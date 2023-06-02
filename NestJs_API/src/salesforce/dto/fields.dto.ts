// Authors: Roward
// Jira-task: 189
// Sprint: 4
// Last modified: 02-06-2023

export class FieldsDTO {
  orgId: string;
  lead: string[];
  contact: string[];
  account: string[];

  constructor(
    orgId: string,
    lead: string[],
    contact: string[],
    account: string[],
  ) {
    this.orgId = orgId;
    this.lead = lead;
    this.contact = contact;
    this.account = account;
  }
}
