import { Module } from '@nestjs/common';
import { SalesforceDAO } from './salesforce.dao';

@Module({
  providers: [SalesforceDAO],
  exports: [SalesforceDAO],
})
export class SalesforceModule {}
