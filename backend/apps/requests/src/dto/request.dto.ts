import { RequestStatus } from "@entity/entities";
import { IsArray, IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class CreateRequestDto {
    @IsNotEmpty() // Valida que el campo adminId no esté vacío
    @IsUUID() // Valida que el campo adminId sea un UUID válido
    adminId: string;

    @IsNotEmpty() // Valida que el campo reserveId no esté vacío
    @IsUUID() // Valida que el campo reserveId sea un UUID válido
    reserveId: string;
}

export class ResponseRequestDto {
    @IsNotEmpty() // Valida que el campo requestId no esté vacío
    @IsUUID() // Valida que el campo requestId sea un UUID válido
    requestId: string;

    @IsNotEmpty() // Valida que el campo status no esté vacío
    @IsEnum(RequestStatus) // Valida que el campo status sea un valor del enum RequestStatus
    status: RequestStatus; 
}
