import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entity/entities/user.entity';
import { JwtStrategy } from '@auth/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from '@email/email/email.module';

@Module({
  imports: [
    // Registering Passport module with JWT as the default strategy
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // Configuring JWT module asynchronously
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        // Retrieving the JWT secret from the configuration service
        secret: cs.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          // Setting the expiration time for the JWT token
          expiresIn: cs.get<string | number>('JWT_ACCESS_EXPIRATION'),
        },
      }),
    }),

    // Registering TypeORM module for User entity
    TypeOrmModule.forFeature([User]),
    // Importing Email module for email-related functionalities
    EmailModule
  ],
  // Specifying the controllers for this module
  controllers: [UsersController],
  // Specifying the providers for this module, including services and strategies
  providers: [UsersService, JwtStrategy] // Needed User to JwtStrategy
})
export class UsersModule {}
