import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto, ResponseRequestDto } from './dto/request.dto';
import { Request } from '@entity/entities';

@Controller()
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}
  @Post()
  async create(
    @Body() createDto: CreateRequestDto):Promise<Request>{
    return this.requestsService.create(createDto);
  }

  @Patch('status')
  async updateStatus(
    @Body() dto: ResponseRequestDto):Promise<void>{
    return this.requestsService.updateStatus(dto);
  }
}
