import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto, ResponseRequestDto } from './dto/request.dto';
import { Request } from '@entity/entities';
import { AdminOnly, DevOnly } from '@auth/auth';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}
  @Post()
  async create(
    @Body() createDto: CreateRequestDto):Promise<Request>{
    return this.requestsService.create(createDto);
  }

  @Patch('status')
  @AdminOnly()
  async updateStatus(
    @Body() dto: ResponseRequestDto,
    @Req() req
  ):Promise<void>{
    return this.requestsService.updateStatus(req.user.id, dto);
  }

  @Get("admin")
  @AdminOnly()
  async findByAdmin(@Req() req) {
    return this.requestsService.findByAdmin(req.user.id);
  }

  @Get()
  @DevOnly()
  async findAll() {
    return this.requestsService.findAll();
  }
}
