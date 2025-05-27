import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configuración de CORS
  app.enableCors({
    origin: 'http://localhost:4200', // frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir el envío de credenciales
  });

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
