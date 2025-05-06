import {
    FilterHotelsDto
} from '../dto/hotel.dto';
  
export interface Hotel {
    _id?: string; // MongoDB
    id: string;
    name: string;
    location: string;
    photo?: string;
    description?: string;
    lower_price?: number;
    higher_price?: number;
    rating?: number;
}
  
export interface HotelServiceInterface {
    findHotelById(id: string): Promise<Hotel>;
    filterHotels(findHotelsDto: FilterHotelsDto): Promise<Hotel[]>;
}