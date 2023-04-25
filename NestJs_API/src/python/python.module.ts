import { Module } from '@nestjs/common';
import { PythonController } from './python.controller';
import { PythonService } from './python.service';
import { PythonDao } from './python.dao';

@Module({
  imports: [],
  controllers: [PythonController],
  providers: [PythonService, PythonDao],
  exports: [PythonDao],
})
export class PythonModule {}
