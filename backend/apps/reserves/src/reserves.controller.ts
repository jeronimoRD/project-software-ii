import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { AdminOnly } from '@auth/auth/decorators/admin.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reserves')
@UseGuards(AuthGuard('jwt'))
export class ReservesController {
  constructor(private reservesService: ReservesService) {}

  // jwt - endpoint

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
