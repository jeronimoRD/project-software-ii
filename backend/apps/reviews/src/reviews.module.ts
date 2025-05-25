// apps/reviews/src/reviews.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review, Hotel, User } from '@entity/entities';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { AuthModule } from '@auth/auth';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@auth/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Hotel, User]),
    JwtModule.register({}),
    AuthModule,           
  ],
  providers: [ReviewsService, JwtStrategy],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
