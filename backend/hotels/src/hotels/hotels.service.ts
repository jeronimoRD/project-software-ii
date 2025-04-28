import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel as SchemaHotel, HotelDocument } from './schema/hotel.schema';
import { FilterHotelsDto } from './dto/hotel.dto';
import { Hotel, HotelServiceInterface } from './interfaces/hotel.interface';

@Injectable()
export class HotelsService implements HotelServiceInterface {
constructor(
    @InjectModel(SchemaHotel.name) private hotelModel: Model<HotelDocument>,
        private configService: ConfigService,
    ) {}

    private toHotelInterface(hotelDoc: HotelDocument): Hotel {
        const hotelObj = hotelDoc.toObject();
        hotelObj.id = hotelObj._id.toString();
        delete hotelObj._id;
        delete hotelObj.__v;
        return hotelObj as Hotel;
    }

    //methods
    async filterHotels(filterHotelsDto: FilterHotelsDto): Promise<Hotel[]> {
        const query: any = {};
    
        if (filterHotelsDto.name) {
            query.name = { 
                $regex: `${filterHotelsDto.name}`, 
                $options: 'i' 
            };
        }
    
        if (filterHotelsDto.location) {
            query.location = { 
                $regex: `${filterHotelsDto.location}`, 
                $options: 'i' 
            };
        }

        if (filterHotelsDto.lower_price) {
            query.lower_price = filterHotelsDto.lower_price;
        }

        if (filterHotelsDto.higher_price) {
            query.higher_price = filterHotelsDto.higher_price;
        }
    
        const hotels = await this.hotelModel.find(query).exec();
        return hotels.map((hotel) => this.toHotelInterface(hotel));
    }
}