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

import { RoomsService } from './rooms.service';
import { FilterRoomsHotelDto, FilterRoomsUniversalDto } from './dto/room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  //endpoints
  @Post('filter')
  async findRooms(@Body() findRoomsDto: FilterRoomsHotelDto) {
    return this.roomsService.filterRoomsbyHotel(findRoomsDto);
  }
  @Post('filter-universal')
  async findRoomsUniversal(@Body() findRoomsDto: FilterRoomsUniversalDto) {
    return this.roomsService.filterRoomsUniversal(findRoomsDto);
  }
}
