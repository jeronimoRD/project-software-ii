import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
    MaxLength,
    IsNotEmpty,
    IsUrl,
    IsUUID,
} from 'class-validator';

export class CreateHotelsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(500)
  photo?: string;

  @IsOptional()
  @MaxLength(2000)
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string; 
}

export class FilterHotelsDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    lower_price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    higher_price?: number;
}