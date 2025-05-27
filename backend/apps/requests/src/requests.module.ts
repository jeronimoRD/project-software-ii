import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request, Reserve, User } from '@entity/entities';
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

      // Importing TypeORM module for Request, User, and Reserve entities
      TypeOrmModule.forFeature([Request, User, Reserve]),
      EmailModule // Importing Email module for email functionalities
  ],
  controllers: [RequestsController], // Specifying the controller for handling requests
  providers: [RequestsService, JwtStrategy], // Registering service and strategy for dependency injection
})
export class RequestsModule {}
