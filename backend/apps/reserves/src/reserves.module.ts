import { Module } from '@nestjs/common';
import { ReservesController } from './reserves.controller';
import { ReservesService } from './reserves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from '@entity/entities/reserve.entity';
import { User } from '@entity/entities/user.entity';
import { Room, Request } from '@entity/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@auth/auth';
import { EmailModule } from '@email/email/email.module';

@Module({
  imports: [
    // Registering Passport module with JWT as the default strategy
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configuring JWT module asynchronously with secret and expiration options
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_ACCESS_SECRET'), // Fetching JWT secret from configuration
        signOptions: {
          expiresIn: cs.get<string | number>('JWT_ACCESS_EXPIRATION'), // Setting token expiration time
        },
      }),
    }),    

    // Importing TypeORM module for Reserve, User, Room, and Request entities
    TypeOrmModule.forFeature([Reserve, User, Room, Request]),
    EmailModule // Importing Email module for email functionalities
  ],
  controllers: [ReservesController], // Specifying the controller for this module
  providers: [ReservesService, JwtStrategy] // Registering service and strategy providers
})
export class ReservesModule {}
