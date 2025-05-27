import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel, Review, User } from '@entity/entities';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@auth/auth';

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
          expiresIn: cs.get<string | number>('JWT_ACCESS_EXPIRATION'), // Setting JWT expiration time
        },
      }),
    }),

    // Importing TypeORM module for Review, User, and Hotel entities
    TypeOrmModule.forFeature([Review, User, Hotel])
  ],
  controllers: [ReviewsController], // Specifying the controller for handling requests
  providers: [ReviewsService, JwtStrategy] // Registering services and strategies needed for authentication
})
export class ReviewsModule {}
