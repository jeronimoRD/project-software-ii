import {
    ConflictException,
    Injectable,
    NotFoundException,
    BadRequestException 
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { CreateHotelsDto, FilterHotelsDto } from './dto/hotel.dto';
import { HotelServiceInterface } from './interfaces/hotel.interface';
import { Hotel, Review, Room } from '@entity/entities';

@Injectable()
export class HotelsService implements HotelServiceInterface {
    constructor(
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
        @InjectRepository(Review) 
        private reviewRepository: Repository<Review>,
        private configService: ConfigService,
    ) {}

    private sanitizeHotel(hotel: Hotel): Hotel {
        const sanitized = { ...hotel };
        return sanitized;
    }

    private isValidUUID(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }

    async create(createDto: CreateHotelsDto): Promise<Hotel> {

         const existingHotel = await this.hotelRepository
        .createQueryBuilder('hotel')
        .where('LOWER(hotel.name) = LOWER(:name)', { name: createDto.name })
        .getOne();

        if (existingHotel) {
            throw new ConflictException('Ya existe un hotel con este nombre');
        }

        const hotel = this.hotelRepository.create({
            ...createDto,
            lower_price: 0,
            higher_price: 0,
            rating: 0,
        });

        const saved = await this.hotelRepository.save(hotel);
        return this.sanitizeHotel(saved);
    }
    
    async updateHotelRating(hotelId: string): Promise<void> {
        if (!this.isValidUUID(hotelId)) {
            throw new BadRequestException('ID de hotel inválido');
        }

        const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
        if (!hotel) {
            throw new NotFoundException('Hotel no encontrado');
        }

        // Calcular promedio de ratings
        const ratingResult = await this.reviewRepository
            .createQueryBuilder('review')
            .select('AVG(review.rating)', 'averageRating')
            .where('review.hotel = :hotelId', { hotelId })
            .getRawOne();

        // Actualizar el rating del hotel
        hotel.rating = ratingResult.averageRating 
            ? parseFloat(parseFloat(ratingResult.averageRating).toFixed(2)) 
            : 0;

        await this.hotelRepository.save(hotel);
    }

    async updateHotelPrices(hotelId: string): Promise<void> {
        // Validar UUID
        if (!this.isValidUUID(hotelId)) {
            throw new BadRequestException('ID de hotel inválido');
        }

        // Obtener el hotel
        const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
        if (!hotel) {
            throw new NotFoundException('Hotel no encontrado');
        }

        // Calcular precios usando una sola consulta
        const prices = await this.roomRepository
            .createQueryBuilder('room')
            .select('MIN(room.price)', 'minPrice')
            .addSelect('MAX(room.price)', 'maxPrice')
            .where('room.hotel = :hotelId', { hotelId })
            .getRawOne();

        // Actualizar los precios del hotel
        hotel.lower_price = prices.minPrice ? Number(prices.minPrice) : 0;
        hotel.higher_price = prices.maxPrice ? Number(prices.maxPrice) : 0;

        await this.hotelRepository.save(hotel);
    }


    async findHotelById(id: string): Promise<Hotel> {
        if (!this.isValidUUID(id)) {
            throw new BadRequestException('ID de hotel inválido');
        }
        
        const hotel = await this.hotelRepository.findOneBy({ id });
        
        if (!hotel) {
            throw new NotFoundException('Hotel no encontrado');
        }
        
        return this.sanitizeHotel(hotel);
    }

    async filterHotels(filterHotelsDto: FilterHotelsDto): Promise<Hotel[]> {
        const query: any = {};

        if (filterHotelsDto.name) {
            query.name = Like(`%${filterHotelsDto.name}%`);
        }

        if (filterHotelsDto.location) {
            query.location = Like(`%${filterHotelsDto.location}%`);
        }

        if (filterHotelsDto.lower_price && filterHotelsDto.higher_price) {
            query.lower_price = Between(
                filterHotelsDto.lower_price,
                filterHotelsDto.higher_price
            );
        } else {
            if (filterHotelsDto.lower_price) {
                query.lower_price = filterHotelsDto.lower_price;
            }
            if (filterHotelsDto.higher_price) {
                query.higher_price = filterHotelsDto.higher_price;
            }
        }

        const hotels = await this.hotelRepository.find({ where: query });
        return hotels.map(hotel => this.sanitizeHotel(hotel));
    }
}