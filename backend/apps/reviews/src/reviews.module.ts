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

    TypeOrmModule.forFeature([Review, User, Hotel])
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, JwtStrategy] //Needed User to JwtStrategy
})
export class ReviewsModule {}
