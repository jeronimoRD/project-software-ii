import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel, Review, Room, User } from '@entity/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@auth/auth';

@Module({
  imports: [
    // Registro del módulo de Passport con la estrategia predeterminada 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configuración asíncrona del módulo JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_ACCESS_SECRET'), // Obtención del secreto para JWT desde la configuración
        signOptions: {
          expiresIn: cs.get<string | number>('JWT_ACCESS_EXPIRATION'), // Establecimiento del tiempo de expiración del token
        },
      }),
    }),

    // Configuración de TypeORM para las entidades Hotel, Room, Review y User
    TypeOrmModule.forFeature([Hotel, Room, Review, User]),
  ],
  controllers: [HotelsController], // Controlador para manejar las solicitudes relacionadas con hoteles
  providers: [HotelsService, JwtStrategy], // Proveedores necesarios, incluyendo el servicio de hoteles y la estrategia JWT
})
export class HotelsModule {}
