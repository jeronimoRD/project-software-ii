import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

import { reserveStatus } from '@entity/entities/reserve.entity';
export class CreateReserveDto {
  @IsNotEmpty()
  @IsString()
  room: string;
  @IsNotEmpty()
  @IsString()
  user: string;
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}

export class UpdateReserveDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsOptional()
  @IsString()
  user: string;
  @IsOptional()
  @IsString()
  room?: string;
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