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
  @IsString() // Valida que el nombre sea una cadena de texto
  @IsNotEmpty() // Asegura que el nombre no esté vacío
  @MaxLength(255) // Limita la longitud máxima del nombre a 255 caracteres
  name: string;

  @IsString() // Valida que la ubicación sea una cadena de texto
  @IsNotEmpty() // Asegura que la ubicación no esté vacía
  @MaxLength(255) // Limita la longitud máxima de la ubicación a 255 caracteres
  location: string;

  @IsUrl() // Valida que la foto sea una URL válida
  @IsOptional() // Indica que la foto es un campo opcional
  @MaxLength(500) // Limita la longitud máxima de la URL de la foto a 500 caracteres
  photo?: string;

  @IsOptional() // Indica que la descripción es un campo opcional
  @MaxLength(2000) // Limita la longitud máxima de la descripción a 2000 caracteres
  @IsString() // Valida que la descripción sea una cadena de texto
  description?: string;

  @IsNotEmpty() // Asegura que el ID de usuario no esté vacío
  @IsUUID() // Valida que el ID de usuario sea un UUID
  user_id: string; 
}

export class FilterHotelsDto {
    @IsOptional() // Indica que el nombre es un campo opcional
    @IsString() // Valida que el nombre sea una cadena de texto
    name?: string;

    @IsOptional() // Indica que la ubicación es un campo opcional
    @IsString() // Valida que la ubicación sea una cadena de texto
    location?: string;

    @IsOptional() // Indica que el precio inferior es un campo opcional
    @IsNumber() // Valida que el precio inferior sea un número
    @Min(0) // Asegura que el precio inferior no sea menor que 0
    lower_price?: number;

    @IsOptional() // Indica que el precio superior es un campo opcional
    @IsNumber() // Valida que el precio superior sea un número
    @Min(0) // Asegura que el precio superior no sea menor que 0
    higher_price?: number;
}
