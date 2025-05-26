import { Request } from '@entity/entities';
import { CreateRequestDto, ResponseRequestDto } from '../dto/request.dto';

export interface ReviewServiceInterface {
    findAll(): Promise<Request[]>
    findByAdmin(adminId: string): Promise<Request[]>
    createRequest(user_id: string, craeteRequestDto: CreateRequestDto): Promise<Request>;
    responseRequest(responseRequestDto: ResponseRequestDto): Promise<void>;
}