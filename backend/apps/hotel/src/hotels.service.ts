import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
    BadRequestException 
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Hotel } from '@entity/entities/hotel.entity';
import { FilterHotelsDto } from './dto/hotel.dto';
import { HotelServiceInterface } from './interfaces/hotel.interface';

@Injectable()
export class HotelsService implements HotelServiceInterface {
    constructor(
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,
    ) {}

    private sanitizeHotel(hotel: Hotel): Hotel {
        const sanitized = { ...hotel };
        return sanitized;
    }

    private isValidUUID(uuid: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
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