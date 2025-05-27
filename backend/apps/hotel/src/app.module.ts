import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsModule } from './hotels.module';
import { User, Hotel, Reserve, Review, Room, Request } from '@entity/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Configuración global del módulo de configuración
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql', // Tipo de base de datos
        host: config.get('MYSQL_HOST'), // Host de la base de datos
        port: config.get('MYSQL_PORT'), // Puerto de la base de datos
        username: config.get('MYSQL_USER'), // Usuario de la base de datos
        password: config.get('MYSQL_PASSWORD'), // Contraseña de la base de datos
        database: config.get('MYSQL_DATABASE'), // Nombre de la base de datos
        entities: [Hotel, Room, Review, User, Reserve, Request], // Entidades que se utilizarán
        synchronize: true, // Sincronización automática de la base de datos
      }),
    }),
    HotelsModule,  // Solo para desarrollo
  ],
})
export class AppModule {}
