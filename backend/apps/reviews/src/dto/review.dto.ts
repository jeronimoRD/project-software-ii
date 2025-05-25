import { IsNotEmpty, IsString, IsNumber, IsOptional, Length, Min, Max, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  hotelId: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 1000)
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  rating: number;
}