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
import {} from './dto/hotel.dto';
import { Hotel, HotelServiceInterface } from './interfaces/hotel.interface';

@Injectable()
export class HotelsService implements HotelServiceInterface {
constructor(
    @InjectModel(SchemaHotel.name) private hotelModel: Model<HotelDocument>,
    private configService: ConfigService,
) {}

    //methods
}