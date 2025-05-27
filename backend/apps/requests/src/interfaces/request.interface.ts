import { Request } from '@entity/entities';
import { CreateRequestDto, ResponseRequestDto } from '../dto/request.dto';

export interface ReviewServiceInterface {
    // Method to retrieve all requests
    findAll(): Promise<Request[]>;

    // Method to retrieve requests by a specific admin's ID
    findByAdmin(adminId: string): Promise<Request[]>;

    // Method to create a new request with the user's ID and request data
    createRequest(user_id: string, createRequestDto: CreateRequestDto): Promise<Request>;

    // Method to respond to a request with the provided response data
    responseRequest(responseRequestDto: ResponseRequestDto): Promise<void>;
}
