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
    Req,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelsDto, FilterHotelsDto } from './dto/hotel.dto';
import { AdminOnly, DevOnly } from '@auth/auth';

@Controller('hotels')
export class HotelsController {
constructor(private readonly hotelsService: HotelsService) {}
  //dev - endpoints
  @Post()
  @DevOnly()
  async create(@Body() createHotelstDto: CreateHotelsDto) { 
    return this.hotelsService.create(createHotelstDto);
  }

  //admin - endpoints
  @Get('admin/my-hotels')
  @AdminOnly()
  async findHotelByAdmin(@Req() req) { 
    return this.hotelsService.findHotelsByAdminId(req.user.id);
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

  @Patch('update-rating/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateRating(@Param('id') id: string): Promise<void> {
    await this.hotelsService.updateHotelRating(id);
  }

  @Patch('update-prices/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePrices(@Param('id') id: string): Promise<void> {
    await this.hotelsService.updateHotelPrices(id);
  }
}