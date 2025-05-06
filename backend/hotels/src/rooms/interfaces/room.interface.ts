import { FilterRoomsHotelDto } from '../dto/room.dto';

export interface Room {
  _id: string;
  id: string;
  hotel: string;
  capacity: number;
  type: string;
  price: number;
  isOccupied: boolean;
}

export interface RoomServiceInterface {
  filterRoomsbyHotel(filter: FilterRoomsHotelDto): Promise<Room[]>;
}
