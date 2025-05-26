import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { AdminOnly } from '@auth/auth/decorators/admin.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reserves')
@UseGuards(AuthGuard('jwt'))
export class ReservesController {
  constructor(private reservesService: ReservesService) {}

  // jwt - endpoint
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findByUser(@Req() req) {
    const userId = req.user.id;
    return this.reservesService.findAllReservesByUser(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createReserve(@Body() createReserveDto, @Req() req) {
    const userId = req.user.id;
    return this.reservesService.createReserve(userId, createReserveDto);
  }

  @Post('update')
  updateReserve(@Body() updateReserveDto) {
    return this.reservesService.updateReserve(updateReserveDto);
  }
}
