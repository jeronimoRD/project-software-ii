import {
  CreateReserveDto,
  UpdateReserveDto
} from '../dto/reserve.dto';

// Interface representing a reservation
export interface Reserve {
  id: string; // Unique identifier for the reservation
  roomId: string; // Identifier for the room being reserved
  userId: string; // Identifier for the user making the reservation
  startDate: Date; // Start date of the reservation
  endDate: Date; // End date of the reservation
  status: string; // Current status of the reservation (e.g., confirmed, canceled)
}

// Interface defining the methods for the reservation service
export interface ReserveServiceInterface {
  // Method to create a new reservation
  createReserve(userId: string, createReserveDto: CreateReserveDto): Promise<Reserve>;
  
  // Method to update an existing reservation
  updateReserve(updateReserveDto: UpdateReserveDto): Promise<Reserve>;
}
