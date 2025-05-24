import { NestFactory } from '@nestjs/core';
import { ReservesModule } from './reserves.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
