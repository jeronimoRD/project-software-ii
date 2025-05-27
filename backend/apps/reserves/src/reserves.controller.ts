import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { AdminOnly } from '@auth/auth/decorators/admin.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reserves')
@UseGuards(AuthGuard('jwt'))
export class ReservesController {
  constructor(private reservesService: ReservesService) {}

  // Endpoint to retrieve all reserves for the authenticated user
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findByUser(@Req() req) {
    const userId = req.user.id; // Extracting user ID from the request object
    return this.reservesService.findAllReservesByUser(userId);
  }

  // Endpoint to create a new reserve for the authenticated user
  @Post()
  @UseGuards(AuthGuard('jwt'))
  createReserve(@Body() createReserveDto, @Req() req) {
    const userId = req.user.id; // Extracting user ID from the request object
    return this.reservesService.createReserve(userId, createReserveDto);
  }

  // Endpoint to update an existing reserve
  @Post('update')
  updateReserve(@Body() updateReserveDto) {
    return this.reservesService.updateReserve(updateReserveDto);
  }
}
