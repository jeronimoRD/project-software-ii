import {
    CreateHotelsDto,
    FilterHotelsDto
} from '../dto/hotel.dto';

// Interfaz que define la estructura de un hotel
export interface Hotel {
    id: string; // Identificador único del hotel
    name: string; // Nombre del hotel
    location: string; // Ubicación del hotel
    photo?: string; // URL de la foto del hotel (opcional)
    description?: string; // Descripción del hotel (opcional)
    lower_price?: number; // Precio más bajo (opcional)
    higher_price?: number; // Precio más alto (opcional)
    rating?: number; // Calificación del hotel (opcional)
}

// Interfaz que define los métodos que debe implementar el servicio de hoteles
export interface HotelServiceInterface {
    create(createHotelDto: CreateHotelsDto): Promise<Hotel>; // Método para crear un nuevo hotel
    updateHotelPrices(hotelId: string): Promise<void>; // Método para actualizar los precios de un hotel
    updateHotelRating(hotelId: string): Promise<void>; // Método para actualizar la calificación de un hotel
    findHotelById(id: string): Promise<Hotel>; // Método para encontrar un hotel por su ID
    filterHotels(findHotelsDto: FilterHotelsDto): Promise<Hotel[]>; // Método para filtrar hoteles según criterios
}
