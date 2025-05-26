import { Review } from '@entity/entities';
import { CreateReviewDto } from '../dto/review.dto';

export interface ReviewServiceInterface {
  createReview(reviewDto: CreateReviewDto): Promise<Review>;
  getReviewsByHotel(hotelId: string): Promise<Review[]>;
}