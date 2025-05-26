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
    PassportModule.register({ defaultStrategy: 'jwt' }),
        
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: cs.get<string | number>('JWT_ACCESS_EXPIRATION'),
        },
      }),
    }),

    TypeOrmModule.forFeature([Room, Hotel, User]), 
  ],
  controllers: [RoomsController],
  providers: [RoomsService, JwtStrategy] //Needed User to JwtStrategy
})
export class RoomsModule {}