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
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // jwt - endpoints
  @Post()
  @UseGuards(AuthGuard('jwt')) // Protects the route with JWT authentication
  async createReview(
    @Body() reviewDto: CreateReviewDto,
    @Req() req
  ) {
    const userId = req.user.id; // Extracts the user ID from the request object
    return this.reviewsService.createReview(userId, reviewDto); // Calls the service to create a review
  }

  // public - endpoints
  @Get('hotel/:hotelId')
  async getByHotel(@Param('hotelId') hotelId: string) {
    return this.reviewsService.getReviewsByHotel(hotelId); // Retrieves reviews for a specific hotel
  }
}
