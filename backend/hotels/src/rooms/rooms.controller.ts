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
import { FilterRoomsHotelDto } from './dto/room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  //endpoints
  @Post('filter')
  async findRooms(@Body() findRoomsDto: FilterRoomsHotelDto) {
    return this.roomsService.filterRoomsbyHotel(findRoomsDto);
  }
}
