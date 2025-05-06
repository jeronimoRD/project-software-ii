import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room as SchemaRoom, RoomDocument } from './schema/room.schema';
import { FilterRoomsHotelDto, FilterRoomsUniversalDto } from './dto/room.dto';
import { Room, RoomServiceInterface } from './interfaces/room.interface';
import {
  Hotel as SchemaHotel,
  HotelDocument,
} from 'src/hotels/schema/hotel.schema';

@Injectable()
export class RoomsService implements RoomServiceInterface {
  constructor(
    @InjectModel(SchemaRoom.name) private roomModel: Model<RoomDocument>,
    @InjectModel(SchemaHotel.name) private hotelModel: Model<HotelDocument>,
    private configService: ConfigService,
  ) {}

  private toRoomInterface(roomDoc: RoomDocument): Room {
    const roomObj = roomDoc.toObject();
    roomObj.id = roomObj._id.toString();
    delete roomObj._id;
    delete roomObj.__v;
    return roomObj as Room;
  }

  //methods
  async filterRoomsbyHotel(
    filterRoomsHotelDto: FilterRoomsHotelDto,
  ): Promise<Room[]> {
    const hotel = await this.hotelModel.findById(filterRoomsHotelDto.hotel);
  
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
  
    const query: any = {
      isOccupied: false,
      hotel: hotel._id,
    };

    if (filterRoomsHotelDto.capacity) {
      query.capacity = filterRoomsHotelDto.capacity;
    }

    if (filterRoomsHotelDto.type) {
      query.type = filterRoomsHotelDto.type;
    }

    if (filterRoomsHotelDto.price) {
      query.price = filterRoomsHotelDto.price;
    }
    const rooms = await this.roomModel.find(query).exec();
    return rooms.map((room) => this.toRoomInterface(room));
  }

  async filterRoomsUniversal(
    filterRoomsUniversalDto: FilterRoomsUniversalDto,
  ): Promise<Room[]> {
    const query: any = {};
  
    if (filterRoomsUniversalDto.location) {
      const hotels = await this.hotelModel.find({
        location: { $regex: `${filterRoomsUniversalDto.location}`, $options: 'i' },
      }).exec();
  
      if (!hotels.length) {
        return [];
      }
  
      const hotelIds = hotels.map(h => h._id);
      query.hotel = { $in: hotelIds };
      
    }
    query.isOccupied = false;
    
    if (filterRoomsUniversalDto.capacity) {
      query.capacity = filterRoomsUniversalDto.capacity;
    }
  
    if (filterRoomsUniversalDto.type) {
      query.type = filterRoomsUniversalDto.type;
    }
  
    if (filterRoomsUniversalDto.price) {
      query.price = filterRoomsUniversalDto.price;
    }
  
    const rooms = await this.roomModel.find(query).exec();
    return rooms.map((room) => this.toRoomInterface(room));
  }
} 