import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel, Review, User } from '@entity/entities';
import { HotelsModule } from 'apps/hotel/src/hotels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Hotel]),
    HotelsModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService]
})
export class ReviewsModule {}
