/**
 * Author(s): Diederik
 * Last modified: 11-05-2023
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port);
}
bootstrap();
