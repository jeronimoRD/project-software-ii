import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from '@entity/entities/room.entity';
import { Hotel } from '@entity/entities/hotel.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@auth/auth/strategies/jwt.strategy';
import { User } from '@entity/entities';

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

    // Importing TypeORM features for Room, Hotel, and User entities
    TypeOrmModule.forFeature([Room, Hotel, User]), 
  ],
  controllers: [RoomsController],
  providers: [RoomsService, JwtStrategy] // Providing RoomsService and JwtStrategy for dependency injection
})
export class RoomsModule {}
