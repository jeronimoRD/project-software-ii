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

    TypeOrmModule.forFeature([Reserve, User, Room, Request]),
    EmailModule
  ],
  controllers: [ReservesController],
  providers: [ReservesService, JwtStrategy] //Needed User to JwtStrategy
})
export class ReservesModule {}
