import {
  CreateReserveDto,
  UpdateReserveDto,
  ApproveorRejectReserveDto,
} from '../dto/reserve.dto';

export interface Reserve {
  id: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface ReserveService {
  createReserve(createReserveDto: CreateReserveDto): Promise<Reserve>;
  updateReserve(updateReserveDto: UpdateReserveDto): Promise<Reserve>;
  adminApproveOrRejectReserve(
    pproveorRejectReserveDto: ApproveorRejectReserveDto,
  ): Promise<Reserve>;
}
