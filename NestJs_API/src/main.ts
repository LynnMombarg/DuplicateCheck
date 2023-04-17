import { NestFactory } from '@nestjs/core';
import { ItemModule } from './model/item.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemModule);
  await app.listen(3000);
}
bootstrap();
