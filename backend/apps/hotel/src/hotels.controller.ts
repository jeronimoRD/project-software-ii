import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelsDto, FilterHotelsDto } from './dto/hotel.dto';
import { AdminOnly, DevOnly } from '@auth/auth';
import { AuthGuard } from '@nestjs/passport';

@Controller('hotels')
export class HotelsController {
constructor(private readonly hotelsService: HotelsService) {}
  //dev - endpoints
  @Post()
  @DevOnly()
  async create(@Body() createHotelstDto: CreateHotelsDto) { 
  return this.hotelsService.create(createHotelstDto);
  }

  //public - endpoints
  @Post('filter')
  async filterHotels(@Body() findHotelsDto: FilterHotelsDto) {
    return this.hotelsService.filterHotels(findHotelsDto);
  }

  // endpoins
  @Get(':id')
  async findOne(@Param('id') id: string) { 
  return this.hotelsService.findHotelById(id);
  }
}