import { NestFactory } from '@nestjs/core';
import { RequestsModule } from './requests.module';

async function bootstrap() {
  const app = await NestFactory.create(RequestsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
