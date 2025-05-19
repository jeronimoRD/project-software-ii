import { NestFactory } from '@nestjs/core';
import { RoomsModule } from './rooms.module';

async function bootstrap() {
  const app = await NestFactory.create(RoomsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
