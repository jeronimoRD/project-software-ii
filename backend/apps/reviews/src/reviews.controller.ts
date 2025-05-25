// apps/reviews/src/reviews.controller.ts
import { Controller, Post, Body, UseGuards, Req, Param, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createReview(
    @Body() reviewDto: CreateReviewDto,
    @Req() req
  ) {
    reviewDto.userId = req.user.id;
    return this.reviewsService.createReview(reviewDto);
  }

  @Get('hotel/:hotelId')
  getByHotel(@Param('hotelId') hotelId: string) {
    return this.reviewsService.getReviewsByHotel(hotelId);
  }
}
