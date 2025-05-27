import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Define el controlador para manejar las solicitudes HTTP
export class AppController {
  constructor(private readonly appService: AppService) {} // Inyecta el servicio de la aplicación

  @Get() // Define el método que maneja las solicitudes GET en la ruta raíz
  getHello(): string {
    return this.appService.getHello(); // Llama al método getHello del servicio y devuelve su resultado
  }
}
