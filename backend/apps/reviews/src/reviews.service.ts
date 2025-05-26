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
import { HotelsService } from 'apps/hotel/src/hotels.service';

@Injectable()
export class ReviewsService implements ReviewServiceInterface {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Hotel) 
    private hotelRepository: Repository<Hotel>,
    private readonly hotelsService: HotelsService,
    @InjectRepository(User)  
    private userRepository: Repository<User>,
  ) {}

  private sanitizeReview(review: Review): Review {
    const sanitized = { ...review };
    return sanitized;
  }

  private isValidUUID(uuid: string): boolean {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(uuid);
  }

  async createReview(reviewDto: CreateReviewDto): Promise<Review> {
    // Validar UUIDs
    if (!this.isValidUUID(reviewDto.hotelId) || !this.isValidUUID(reviewDto.userId)) {
      throw new BadRequestException('IDs de hotel o usuario inválidos');
    }

    // Buscar entidades relacionadas
    const hotel = await this.hotelRepository.findOneBy({ id: reviewDto.hotelId });
    const user = await this.userRepository.findOneBy({ id: reviewDto.userId });

    if (!hotel || !user) {
      throw new NotFoundException('Hotel o usuario no encontrado');
    }

    // Crear nueva review
    const newReview = this.reviewRepository.create({
      ...reviewDto,
      hotel,
      user
    });

    const savedReview = await this.reviewRepository.save(newReview);

    //Actualizar rating
    await this.hotelsService.updateHotelRating(hotel.id);

    return this.sanitizeReview(savedReview);
  }

  async getReviewsByHotel(hotelId: string): Promise<Review[]> {
    if (!this.isValidUUID(hotelId)) {
      throw new BadRequestException('ID de hotel inválido');
    }

    const reviews = await this.reviewRepository.find({
      where: { hotel: { id: hotelId } },
      relations: ['user'], 
      order: { id: 'DESC' }
    });

    return reviews.map(review => this.sanitizeReview(review));
  }
}
