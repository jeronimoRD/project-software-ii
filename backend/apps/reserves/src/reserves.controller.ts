import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReservesService } from './reserves.service';
import { AdminOnly } from '@auth/auth/admin.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('reserves')
@UseGuards(AuthGuard('jwt'))
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}

  @Post()
  createReserve(@Body() createReserveDto) {
    return this.reservesService.createReserve(createReserveDto);
  }

  @Post('update')
  updateReserve(@Body() updateReserveDto) {
    return this.reservesService.updateReserve(updateReserveDto);
  }
}
