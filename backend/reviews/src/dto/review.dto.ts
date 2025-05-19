import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
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