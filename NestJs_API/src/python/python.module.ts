import { Module } from '@nestjs/common';
import { PythonDAO } from './python.dao';

@Module({
  imports: [],
  providers: [
    PythonDAO,
    // { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [PythonDAO],
})
export class PythonModule {}
