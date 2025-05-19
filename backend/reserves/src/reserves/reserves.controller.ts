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
import { ReservesService } from './reserves.service';
import {
  CreateReserveDto,
  UpdateReserveDto,
  ApproveorRejectReserveDto,
} from './dto/reserve.dto';

@Controller('reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}

  //endpoints
  @Post('create')
  async createReserve(@Body() createReserveDto: CreateReserveDto) {
    return this.reservesService.createReserve(createReserveDto);
  }
  @Patch('update')
  async updateReserve(@Body() updateReserveDto: UpdateReserveDto) {
    return this.reservesService.updateReserve(updateReserveDto);
  }
  @Patch('approve-or-reject')
  async approveOrRejectReserve(
    @Body() approveorRejectReserveDto: ApproveorRejectReserveDto,
  ) {
    return this.reservesService.adminApproveOrRejectReserve(
      approveorRejectReserveDto,
    );
  }
}
