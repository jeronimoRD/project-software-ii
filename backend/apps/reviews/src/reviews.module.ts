import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel, Review, User } from '@entity/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Hotel]),

  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
