import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { Review } from '@entity/entities/review.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // reviews.controller.ts
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() reviewDto: CreateReviewDto,
    @Req() req
  ) {
    return this.reviewsService.createReview({
      ...reviewDto,
      userId: req.user.id
    });
  }

  @Get('hotel/:hotelId')
  async getByHotel(@Param('hotelId') hotelId: string) {
    return this.reviewsService.getReviewsByHotel(hotelId);
  }
}