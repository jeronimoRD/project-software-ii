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
import { FilterRoomsHotelDto } from './dto/room.dto';
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
    console.log(filterRoomsHotelDto);
    const hotel = await this.hotelModel.findOne({
      name: { $regex: `${filterRoomsHotelDto.hotel}`, $options: 'i' },
    });

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
}
