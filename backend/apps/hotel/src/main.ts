import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //CORS configuration
  app.enableCors({
    origin: 'http://localhost:4200', //frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
