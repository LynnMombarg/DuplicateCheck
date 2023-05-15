// Authors: Roward
// Jira-task: 115 - Jobs ophalen van Salesforce in NestJS
// Sprint: 3
// Last modified: 12-05-2023

import { Module } from '@nestjs/common';
import { SalesforceDAO } from './salesforce.dao';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SalesforceDAO, AuthService,],
  exports: [SalesforceDAO]
})
export class SalesforceModule {}
