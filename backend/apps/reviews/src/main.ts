import { NestFactory } from '@nestjs/core';
import { ReviewsModule } from './reviews.module';

async function bootstrap() {
  const app = await NestFactory.create(ReviewsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
