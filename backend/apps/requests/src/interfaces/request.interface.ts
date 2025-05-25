import { Request } from '@entity/entities';
import { CreateRequestDto, ResponseRequestDto } from '../dto/request.dto';

export interface ReviewServiceInterface {
    createRequest(craeteRequestDto: CreateRequestDto): Promise<Request>;
    responseRequest(responseRequestDto: ResponseRequestDto): Promise<void>;
}