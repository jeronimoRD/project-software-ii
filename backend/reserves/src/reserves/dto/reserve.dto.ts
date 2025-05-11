import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
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
  id: string;
  @IsNotEmpty()
  @IsNumber()
  roomId: string;
  @IsNotEmpty()
  @IsNumber()
  userId: string;
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
  id: string;
  @IsOptional()
  @IsNumber()
  userId?: string;
  @IsOptional()
  @IsNumber()
  roomId?: string;
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
  id: string;
  @IsNotEmpty()
  @IsString()
  decision: string;
}
