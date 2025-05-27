import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/review.dto';
import { Repository } from 'typeorm';
import { ReviewServiceInterface } from './interfaces/review.interface';
import { Hotel, User, Review } from '@entity/entities';

@Injectable()
export class ReviewsService implements ReviewServiceInterface {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Hotel) 
    private hotelRepository: Repository<Hotel>,
    @InjectRepository(User)  
    private userRepository: Repository<User>,
  ) {}

  private sanitizeReview(review: Review): Review {
    const sanitized = { ...review }; // Create a copy of the review object to avoid mutating the original
    return sanitized; // Return the sanitized review object
  }

  private isValidUUID(uuid: string): boolean {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // Regular expression to validate UUID format
      return uuidRegex.test(uuid); // Test the UUID against the regex and return the result
  }

  async createReview(userId: string, reviewDto: CreateReviewDto): Promise<Review> {
    // Validate UUIDs
    if (!this.isValidUUID(reviewDto.hotelId) || !this.isValidUUID(userId)) {
      throw new BadRequestException('Invalid hotel or user IDs'); // Throw an exception if the UUIDs are invalid
    }

    // Fetch related entities
    const hotel = await this.hotelRepository.findOneBy({ id: reviewDto.hotelId }); // Retrieve the hotel entity by ID
    const user = await this.userRepository.findOneBy({ id: userId }); // Retrieve the user entity by ID

    if (!hotel || !user) {
      throw new NotFoundException('Hotel or user not found'); // Throw an exception if either entity is not found
    }

    // Create new review
    const newReview = this.reviewRepository.create({
      ...reviewDto,
      hotel,
      user
    }); // Create a new review object with the provided data and associated entities

    const savedReview = await this.reviewRepository.save(newReview); // Save the new review to the database

    return this.sanitizeReview(savedReview); // Return the sanitized version of the saved review
  }

  async getReviewsByHotel(hotelId: string): Promise<Review[]> {
    if (!this.isValidUUID(hotelId)) {
      throw new BadRequestException('Invalid hotel ID'); // Throw an exception if the hotel ID is invalid
    }

    const reviews = await this.reviewRepository.find({
      where: { hotel: { id: hotelId } }, // Find reviews associated with the specified hotel ID
      relations: ['user'], // Include user relation in the result
      order: { id: 'DESC' } // Order reviews by ID in descending order
    });

    return reviews.map(review => this.sanitizeReview(review)); // Return an array of sanitized reviews
  }
}
