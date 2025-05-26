import { RequestStatus } from "@entity/entities";
import { IsArray, IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class CreateRequestDto {
    @IsNotEmpty()
    @IsUUID()
    adminId: string;

    @IsNotEmpty()
    @IsUUID()
    reserveId: string;
}

export class ResponseRequestDto {
    @IsNotEmpty()
    @IsUUID()
    requestId: string;

    @IsNotEmpty()
    @IsEnum(RequestStatus)
    status: RequestStatus; 
}