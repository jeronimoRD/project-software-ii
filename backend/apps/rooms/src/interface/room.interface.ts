import { ChangeStatusDto, FilterRoomsHotelDto, FilterRoomsUniversalDto } from '../dto/room.dto';
import { Hotel } from '@entity/entities/hotel.entity'

export interface Room {
  id: string;
  hotel: Hotel;
  capacity: number;
  type: string;
  price: number;
  isOccupied: boolean;
}

export interface RoomServiceInterface {
  changeStatus(changeStatusDto: ChangeStatusDto): Promise<Room>;
  filterRoomsbyHotel(filter: FilterRoomsHotelDto): Promise<Room[]>;
  filterRoomsUniversal(filterRoomsUniversalDto: FilterRoomsUniversalDto): Promise<Room[]>;
}