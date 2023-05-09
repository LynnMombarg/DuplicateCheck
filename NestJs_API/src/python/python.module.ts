import { Module } from '@nestjs/common';
import { PythonController } from './python.controller';
import { PythonService } from './python.service';
import { PythonDAO } from './python.dao';
import { APP_GUARD } from "@nestjs/core";


@Module({
  imports: [],
  controllers: [PythonController],
  providers: [
    PythonService,
    PythonDAO,
    // { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [PythonDAO],
})
export class PythonModule {}
