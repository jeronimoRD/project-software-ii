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
  Req,
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
  async create(@Body() createRoomDto: CreateRoomDto, @Req() req) {
    return this.roomsService.create(req.user.id, createRoomDto);
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