import { IsNotEmpty, IsString, IsNumber, IsOptional, Length, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty() // Ensures hotelId is provided and not empty
  @IsString() // Validates that hotelId is a string
  hotelId: string;

  @IsNotEmpty() // Ensures title is provided and not empty
  @IsString() // Validates that title is a string
  @Length(5, 100) // Validates that title length is between 5 and 100 characters
  title: string;

  @IsNotEmpty() // Ensures content is provided and not empty
  @IsString() // Validates that content is a string
  @Length(20, 1000) // Validates that content length is between 20 and 1000 characters
  content: string;

  @IsNotEmpty() // Ensures rating is provided and not empty
  @IsNumber() // Validates that rating is a number
  @Min(1) // Validates that rating is at least 1
  @Max(5) // Validates that rating is at most 5
  rating: number;
}

export class UpdateReviewDto {
  @IsOptional() // Indicates that content is optional
  @IsString() // Validates that content is a string
  content: string;

  @IsOptional() // Indicates that rating is optional
  @IsNumber() // Validates that rating is a number
  rating: number;
}
