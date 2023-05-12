// Authors: Roward
// Jira-task: 115 - Jobs ophalen van Salesforce in NestJS
// Sprint: 3
// Last modified: 12-05-2023

import { Module } from '@nestjs/common';
import { SalesforceDAO } from './salesforce.dao';

@Module({
  imports: [],
  providers: [SalesforceDAO],
  exports: [SalesforceDAO]
})
export class SalesforceModule {}
