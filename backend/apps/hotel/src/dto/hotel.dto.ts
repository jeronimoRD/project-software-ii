import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
} from 'class-validator';

export class CreateHotelsDto {} //Future to Admin

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