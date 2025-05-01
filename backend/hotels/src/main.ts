import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS configuration
  app.enableCors({
    origin: 'http://localhost:4200', //frontend angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // restrictions
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
