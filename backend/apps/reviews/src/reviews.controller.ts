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

  // jwt - endpoints
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createReview(
    @Body() reviewDto: CreateReviewDto,
    @Req() req
  ) {
    const userId = req.user.id
    return this.reviewsService.createReview(userId, reviewDto);
  }

  // public - endpoints
  @Get('hotel/:hotelId')
  async getByHotel(@Param('hotelId') hotelId: string) {
    return this.reviewsService.getReviewsByHotel(hotelId);
  }
}