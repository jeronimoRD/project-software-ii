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
import { CreateRoomDto, FilterRoomsHotelDto, FilterRoomsUniversalDto } from './dto/room.dto';
import { AdminOnly } from '@auth/auth';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  // admin - endpoints
  @Post()
  @AdminOnly()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  // public - endpoints
  @Post('filter')
  async findRooms(@Body() findRoomsDto: FilterRoomsHotelDto) {
    return this.roomsService.filterRoomsbyHotel(findRoomsDto);
  }
  @Post('filter-universal')
  async findRoomsUniversal(@Body() findRoomsDto: FilterRoomsUniversalDto) {
    return this.roomsService.filterRoomsUniversal(findRoomsDto);
  }
}