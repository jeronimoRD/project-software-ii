import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { FilterHotelsDto } from './dto/hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

    //endpoints
    @Get(':id')
    async findOne(@Param('id') id: string) { 
    return this.hotelsService.findHotelById(id);
    }

    @Post('filter')
    async filterHotels(@Body() findHotelsDto: FilterHotelsDto) {
      return this.hotelsService.filterHotels(findHotelsDto);
    }
}
