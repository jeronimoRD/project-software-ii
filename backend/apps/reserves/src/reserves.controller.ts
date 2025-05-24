import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReservesService } from './reserves.service';

@Controller('reserves')
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

  @Post('admin-approve-or-reject')
  adminApproveOrRejectReserve(@Body() approveOrRejectReserveDto) {
    return this.reservesService.adminApproveOrRejectReserve(approveOrRejectReserveDto);
  }
}
