import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum reserveStatus {
  RESERVED = 'reserved',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}
export class CreateReserveDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  roomId: number;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
  @IsNotEmpty()
  @IsString()
  status: reserveStatus;
}

export class UpdateReserveDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsNumber()
  userId?: number;
  @IsOptional()
  @IsNumber()
  roomId?: number;
  @IsOptional()
  @IsDateString()
  startDate?: Date;
  @IsOptional()
  @IsDateString()
  endDate?: Date;
  @IsOptional()
  @IsString()
  status?: reserveStatus;
}

export class ApproveorRejectReserveDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  decision: string;
}
