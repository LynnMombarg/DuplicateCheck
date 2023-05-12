// Authors: Marloes
// Jira-task: 107 - Models toevoegen aan database
// Sprint: 2
// Last modified: 26-04-2023

import { Module } from '@nestjs/common';
import { SalesforceDAO } from './salesforce.dao';

@Module({
  imports: [],
  providers: [SalesforceDAO],
  exports: [SalesforceDAO]
})
export class SalesforceModule {}
