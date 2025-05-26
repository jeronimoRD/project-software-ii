import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request, Reserve, User } from '@entity/entities';
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

      TypeOrmModule.forFeature([Request, User, Reserve])
  ],
  controllers: [RequestsController],
  providers: [RequestsService, JwtStrategy], //Needed User to JwtStrategy
})
export class RequestsModule {}
