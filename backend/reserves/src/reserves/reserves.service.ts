import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateReserveDto,
  UpdateReserveDto,
  ApproveorRejectReserveDto,
  reserveStatus,
} from './dto/reserve.dto';
import { Reserve } from './entities/reserve.entity';
import { ReserveServiceInterface } from './interfaces/reserve.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservesService implements ReserveServiceInterface {
  constructor(
    @InjectRepository(Reserve)
    private reserveRepository: Repository<Reserve>,
    private configService: ConfigService,
  ) {}

  private isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  async createReserve(createReserveDto: CreateReserveDto): Promise<Reserve> {
    const reserve = new Reserve();
    reserve.roomId = createReserveDto.roomId;
    reserve.startDate = createReserveDto.startDate;
    reserve.endDate = createReserveDto.endDate;
    reserve.status = createReserveDto.status;
    return await this.reserveRepository.save(reserve);
  }

  async updateReserve(updateReserveDto: UpdateReserveDto): Promise<Reserve> {
    if (!this.isValidUUID(updateReserveDto.id)) {
      throw new BadRequestException('ID de reserva inválido');
    }

    const reserve = await this.reserveRepository.findOneBy({
      id: updateReserveDto.id,
    });

    if (!reserve) {
      throw new BadRequestException('Reserva no encontrada');
    }

    // Update only provided fields
    if (updateReserveDto.roomId !== undefined) {
      reserve.roomId = updateReserveDto.roomId;
    }
    if (updateReserveDto.startDate !== undefined) {
      reserve.startDate = updateReserveDto.startDate;
    }
    if (updateReserveDto.endDate !== undefined) {
      reserve.endDate = updateReserveDto.endDate;
    }
    if (updateReserveDto.status !== undefined) {
      reserve.status = updateReserveDto.status;
    }

    return await this.reserveRepository.save(reserve);
  }

  async adminApproveOrRejectReserve(
    ApproveorRejectReserveDto: ApproveorRejectReserveDto,
  ): Promise<Reserve> {
    const reserve = await this.reserveRepository.findOneBy({
      id: ApproveorRejectReserveDto.id,
    });

    if (!reserve) {
      throw new BadRequestException('Reserva no encontrada');
    }

    if (ApproveorRejectReserveDto.decision === 'approve') {
      reserve.status = reserveStatus.CONFIRMED;
    } else if (ApproveorRejectReserveDto.decision === 'reject') {
      reserve.status = reserveStatus.REJECTED;
    }

    return await this.reserveRepository.save(reserve);
  }
}
