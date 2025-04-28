import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
    Max,
} from 'class-validator';

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

