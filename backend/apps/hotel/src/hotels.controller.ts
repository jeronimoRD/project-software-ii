import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Patch,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelsDto, FilterHotelsDto } from './dto/hotel.dto';
import { DevOnly } from '@auth/auth';

@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}

    // Endpoint para crear un nuevo hotel, accesible solo en desarrollo
    @Post()
    @DevOnly()
    async create(@Body() createHotelstDto: CreateHotelsDto) { 
        return this.hotelsService.create(createHotelstDto);
    }

    // Endpoint para filtrar hoteles según criterios específicos
    @Post('filter')
    async filterHotels(@Body() findHotelsDto: FilterHotelsDto) {
        return this.hotelsService.filterHotels(findHotelsDto);
    }

    // Endpoint para obtener un hotel específico por su ID
    @Get(':id')
    async findOne(@Param('id') id: string) { 
        return this.hotelsService.findHotelById(id);
    }

    // Endpoint para actualizar la calificación de un hotel específico
    @Patch('update-rating/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateRating(@Param('id') id: string): Promise<void> {
        await this.hotelsService.updateHotelRating(id);
    }

    // Endpoint para actualizar los precios de un hotel específico
    @Patch(':update-prices/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updatePrices(@Param('id') id: string): Promise<void> {
        await this.hotelsService.updateHotelPrices(id);
    }
}
