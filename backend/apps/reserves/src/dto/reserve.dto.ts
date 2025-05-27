import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';

import { reserveStatus } from '@entity/entities/reserve.entity';

export class CreateReserveDto {
  @IsNotEmpty() // Ensures that roomId is not empty
  @IsUUID() // Validates that roomId is a valid UUID format
  roomId: string;

  @IsNotEmpty() // Ensures that startDate is not empty
  @IsDateString() // Validates that startDate is in a valid date string format
  startDate: Date;

  @IsNotEmpty() // Ensures that endDate is not empty
  @IsDateString() // Validates that endDate is in a valid date string format
  endDate: Date;
}

export class UpdateReserveDto {
  @IsNotEmpty() // Ensures that id is not empty
  @IsString() // Validates that id is a string
  id: string;

  @IsOptional() // Indicates that user is optional
  @IsString() // Validates that user is a string
  user: string;

  @IsOptional() // Indicates that room is optional
  @IsString() // Validates that room is a string
  room?: string;

  @IsOptional() // Indicates that startDate is optional
  @IsDateString() // Validates that startDate is in a valid date string format
  startDate?: Date;

  @IsOptional() // Indicates that endDate is optional
  @IsDateString() // Validates that endDate is in a valid date string format
  endDate?: Date;

  @IsOptional() // Indicates that status is optional
  @IsString() // Validates that status is a string
  status?: reserveStatus;
}
