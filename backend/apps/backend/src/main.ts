import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validaciones: Se aplica un pipe global para validar y transformar las solicitudes entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
    }),
  );

  // Configuración de CORS: Permite solicitudes desde el frontend Angular en localhost
  app.enableCors({
    origin: 'http://localhost:4200', // frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
