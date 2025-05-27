import { Review } from '@entity/entities';
import { CreateReviewDto } from '../dto/review.dto';

// Interface defining the structure of the ReviewService
export interface ReviewServiceInterface {
  // Method to create a review for a specific user
  createReview(userId: string, reviewDto: CreateReviewDto): Promise<Review>;
  
  // Method to retrieve all reviews associated with a specific hotel
  getReviewsByHotel(hotelId: string): Promise<Review[]>;
}
