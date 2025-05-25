import { RoomType } from '@entity/entities';
import { IsString, IsOptional, IsNumber, Min, IsUUID, IsBoolean, IsNotEmpty } from 'class-validator';

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsUUID()
  roomId: string;

  @IsNotEmpty()
  @IsBoolean()
  isOccupied: boolean;
}


export class FilterRoomsHotelDto {
  @IsString()
  hotel: string; 

  @IsOptional()
  @IsNumber()
  @Min(0)
  capacity?: number;

  @IsOptional()
  @IsString()
  type?: RoomType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}

export class FilterRoomsUniversalDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  capacity?: number;

  @IsOptional()
  @IsString()
  type?: RoomType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
