import {
  CreateReserveDto,
  UpdateReserveDto,
  ApproveorRejectReserveDto,
} from '../dto/reserve.dto';

export interface Reserve {
  id: string;
  roomId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface ReserveServiceInterface {
  createReserve(createReserveDto: CreateReserveDto): Promise<Reserve>;
  updateReserve(updateReserveDto: UpdateReserveDto): Promise<Reserve>;
  adminApproveOrRejectReserve(
    ApproveorRejectReserveDto: ApproveorRejectReserveDto,
  ): Promise<Reserve>;
}
