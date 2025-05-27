import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Método que devuelve un saludo en forma de cadena
  getHello(): string {
    return 'Backend-Software';
  }
}

