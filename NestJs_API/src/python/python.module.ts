import { Module } from '@nestjs/common';
import { PythonController } from './python.controller';
import { PythonService } from './python.service';
import { PythonDAO } from './python.dao';

@Module({
  imports: [],
  controllers: [PythonController],
  providers: [PythonService, PythonDAO],
  exports: [PythonDAO],
})
export class PythonModule {}
