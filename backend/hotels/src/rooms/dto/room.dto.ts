import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export enum RoomType {
  STANDARD = 'standard',
  SUITE = 'suite',
  FAMILIAR = 'familiar',
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