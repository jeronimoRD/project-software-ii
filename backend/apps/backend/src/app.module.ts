import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, Hotel, Room, Reserve, Review, Request } from '@entity/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Configuración global del módulo de configuración
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // Tipo de base de datos
        host: configService.get('MYSQL_HOST'), // Host de la base de datos
        port: configService.get('MYSQL_PORT'), // Puerto de la base de datos
        username: configService.get('MYSQL_USER'), // Usuario de la base de datos
        password: configService.get('MYSQL_PASSWORD'), // Contraseña de la base de datos
        database: configService.get('MYSQL_DATABASE'), // Nombre de la base de datos
        entities: [User, Hotel, Room, Reserve, Review, Request], // Nuevas entidades
        synchronize: true, // Sincronización solo en desarrollo
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
