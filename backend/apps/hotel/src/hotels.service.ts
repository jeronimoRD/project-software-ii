import {
    ConflictException,
    Injectable,
    NotFoundException,
    BadRequestException, 
    ForbiddenException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { CreateHotelsDto, FilterHotelsDto } from './dto/hotel.dto';
import { HotelServiceInterface } from './interfaces/hotel.interface';
import { Hotel, Review, User, UserRole } from '@entity/entities';

@Injectable()
export class HotelsService implements HotelServiceInterface {
    constructor(
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
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

        const user = await this.userRepository.findOne({ 
            where: { id: createDto.user_id },
            select: ['id', 'role'] 
        });
        if (!user) throw new NotFoundException(`Admin with ID "${createDto.user_id}" not found`);
        if (user.role !== UserRole.ADMIN) throw new ForbiddenException('Solo los administradores pueden realizar esta acción');

        const existingHotel = await this.hotelRepository
        .createQueryBuilder('hotel')
        .where('LOWER(hotel.name) = LOWER(:name)', { name: createDto.name })
        .getOne();

        if (existingHotel) {
            throw new ConflictException('Ya existe un hotel con este nombre');
        }

        const hotel = this.hotelRepository.create({
            ...createDto,
            user: user,
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

        // Obtener hotel con relaciones
        const hotel = await this.hotelRepository.findOne({
            where: { id: hotelId },
            relations: ['reviews']
        });

        if (!hotel) {
            throw new NotFoundException('Hotel no encontrado');
        }

        // Calcular promedio de ratings
        const result = await this.reviewRepository
        .createQueryBuilder('review')
        .select('ROUND(AVG(review.rating), 2)', 'average')
        .where('review.hotel_id = :hotelId', { hotelId }) 
        .getRawOne();

        // 3. Actualizar y guardar con transacción
        await this.hotelRepository.manager.transaction(async manager => {
            await manager.update(Hotel, hotelId, {
                rating: result.average || 0
            });
        });
    }

    async updateHotelPrices(hotelId: string): Promise<void> {
        // Validar UUID
        if (!this.isValidUUID(hotelId)) {
            throw new BadRequestException('ID de hotel inválido');
        }

        // Obtener el hotel
        const hotel = await this.hotelRepository.findOne({
            where: { id: hotelId },
            relations: ['rooms'] // Cargar habitaciones relacionadas
        });
        if (!hotel) {
            throw new NotFoundException('Hotel no encontrado');
        }

        // Calcular precios usando una sola consulta
        if (hotel.rooms && hotel.rooms.length > 0) {
        const prices = hotel.rooms.reduce((acc, room) => {
            acc.min = Math.min(acc.min, room.price);
            acc.max = Math.max(acc.max, room.price);
            return acc;
        }, { min: Infinity, max: -Infinity });

            hotel.lower_price = prices.min === Infinity ? 0 : prices.min;
            hotel.higher_price = prices.max === -Infinity ? 0 : prices.max;
        } else {
            hotel.lower_price = 0;
            hotel.higher_price = 0;
        }
        
        // Actualizar los precios del hotel
        await this.hotelRepository.update(hotelId, {
            lower_price: hotel.lower_price,
            higher_price: hotel.higher_price
        });
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