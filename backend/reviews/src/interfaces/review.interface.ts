import { ReviewDto, UpdateReviewDto } from '../dto/review.dto';

export interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
  hotel: string;
}
export interface ReviewInterface {
  createReview(review: ReviewDto): Promise<void>;
  getReviewById(id: number): Promise<ReviewDto>;
  updateReview(id: number, review: UpdateReviewDto): Promise<void>;
  deleteReview(id: number): Promise<void>;
}
