import { ChangeStatusDto, CreateRoomDto, FilterRoomsHotelDto, FilterRoomsUniversalDto } from '../dto/room.dto';
import { Hotel } from '@entity/entities/hotel.entity'

// Room interface representing the structure of a room entity
export interface Room {
  id: string; // Unique identifier for the room
  hotel: Hotel; // Associated hotel entity
  capacity: number; // Maximum number of occupants in the room
  type: string; // Type of room (e.g., single, double, suite)
  price: number; // Price per night for the room
  isOccupied: boolean; // Indicates if the room is currently occupied
}

// Interface defining the methods for room service operations
export interface RoomServiceInterface {
  create(userId: string, createRoomDto: CreateRoomDto): Promise<Room>; // Method to create a new room
  changeStatus(changeStatusDto: ChangeStatusDto): Promise<Room>; // Method to change the status of a room
  filterRoomsbyHotel(filter: FilterRoomsHotelDto): Promise<Room[]>; // Method to filter rooms by hotel
  filterRoomsUniversal(filterRoomsUniversalDto: FilterRoomsUniversalDto): Promise<Room[]>; // Method to filter rooms universally
}
