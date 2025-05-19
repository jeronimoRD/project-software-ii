import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReserveDto, UpdateReserveDto, ApproveorRejectReserveDto, reserveStatus } from './dto/reserve.dto';
import { Reserve } from './entities/reserve.entity';
import { ReserveService } from './interfaces/reserve.interface';

@Injectable()
export class ReservesService implements ReserveService {
  constructor(
    @InjectRepository(Reserve)
    private reserveRepository: Repository<Reserve>,
  ) {}

  async createReserve(createReserveDto: CreateReserveDto): Promise<Reserve> {
    const reserve = new Reserve();
    reserve.roomId = createReserveDto.roomId;
    reserve.startDate = createReserveDto.startDate;
    reserve.endDate = createReserveDto.endDate;
    reserve.status = createReserveDto.status;
    return await this.reserveRepository.save(reserve);
  }
  async updateReserve(updateReserveDto: UpdateReserveDto): Promise<Reserve> {
    const reserve = await this.reserveRepository.findOne(updateReserveDto.id);
    if (!reserve) {
      throw new Error('Reserve not found');
    }
    reserve.roomId = updateReserveDto.roomId;
    reserve.startDate = updateReserveDto.startDate;
    reserve.endDate = updateReserveDto.endDate;
    reserve.status = updateReserveDto.status;
    return await this.reserveRepository.save(reserve);
  }
  async adminApproveOrRejectReserve(
    approveorRejectReserveDto: ApproveorRejectReserveDto,
  ): Promise<Reserve> {
    const reserve = await this.reserveRepository.findOne(
      approveorRejectReserveDto.id,
    );
    if (!reserve) {
      throw new Error('Reserve not found');
    }
    if (approveorRejectReserveDto.decision === 'approve') {
      reserve.status = reserveStatus.CONFIRMED;
    }
    if (approveorRejectReserveDto.decision === 'reject') {
      reserve.status = reserveStatus.REJECTED;
    }
    return await this.reserveRepository.save(reserve);
  }
}
