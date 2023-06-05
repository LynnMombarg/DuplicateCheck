import { Module } from '@nestjs/common';
import { PythonDAO } from './python.dao';

@Module({
  imports: [],
  providers: [PythonDAO],
  exports: [PythonDAO],
})
export class PythonModule {}
