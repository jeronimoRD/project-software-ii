import { NestFactory } from '@nestjs/core';
import { HotelsModule } from './hotels.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(HotelsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
