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

    TypeOrmModule.forFeature([Hotel, Room, Review, User]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService, JwtStrategy] //Needed User to JwtStrategy
})
export class HotelsModule {}