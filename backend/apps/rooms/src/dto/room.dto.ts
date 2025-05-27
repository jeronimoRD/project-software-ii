import { RoomType } from '@entity/entities';
import { IsString, IsOptional, IsNumber, Min, IsUUID, IsBoolean, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty() // Ensures that the hotel field is not empty
  @IsUUID() // Validates that the hotel field is a valid UUID
  hotel: string;

  @IsNotEmpty() // Ensures that the capacity field is not empty
  @IsNumber() // Validates that the capacity field is a number
  capacity: number;

  @IsNotEmpty() // Ensures that the type field is not empty
  @IsEnum(RoomType) // Validates that the type field is one of the defined RoomType enums
  type: RoomType;

  @IsNotEmpty() // Ensures that the price field is not empty
  @IsNumber() // Validates that the price field is a number
  @Min(0) // Ensures that the price is not less than 0
  price: number;
}

export class ChangeStatusDto {
  @IsNotEmpty() // Ensures that the roomId field is not empty
  @IsUUID() // Validates that the roomId field is a valid UUID
  roomId: string;

  @IsNotEmpty() // Ensures that the isOccupied field is not empty
  @IsBoolean() // Validates that the isOccupied field is a boolean
  isOccupied: boolean;
}

export class FilterRoomsHotelDto {
  @IsString() // Validates that the hotel field is a string
  hotel: string; 

  @IsOptional() // Indicates that the capacity field is optional
  @IsNumber() // Validates that the capacity field is a number
  @Min(0) // Ensures that the capacity is not less than 0
  capacity?: number;

  @IsOptional() // Indicates that the type field is optional
  @IsString() // Validates that the type field is a string
  type?: RoomType;

  @IsOptional() // Indicates that the price field is optional
  @IsNumber() // Validates that the price field is a number
  @Min(0) // Ensures that the price is not less than 0
  price?: number;
}

export class FilterRoomsUniversalDto {
  @IsOptional() // Indicates that the location field is optional
  @IsString() // Validates that the location field is a string
  location?: string;

  @IsOptional() // Indicates that the capacity field is optional
  @IsNumber() // Validates that the capacity field is a number
  @Min(0) // Ensures that the capacity is not less than 0
  capacity?: number;

  @IsOptional() // Indicates that the type field is optional
  @IsString() // Validates that the type field is a string
  type?: RoomType;

  @IsOptional() // Indicates that the price field is optional
  @IsNumber() // Validates that the price field is a number
  @Min(0) // Ensures that the price is not less than 0
  price?: number;
}
