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
    @Body() createDto: CreateRequestDto): Promise<Request> {
    // Calls the service to create a new request using the provided DTO
    return this.requestsService.create(createDto);
  }

  @Patch('status')
  @AdminOnly()
  async updateStatus(
    @Body() dto: ResponseRequestDto,
    @Req() req
  ): Promise<void> {
    // Updates the status of a request based on the user's ID and the provided DTO
    return this.requestsService.updateStatus(req.user.id, dto);
  }

  @Get("admin")
  @AdminOnly()
  async findByAdmin(@Req() req) {
    // Retrieves requests associated with the admin user
    return this.requestsService.findByAdmin(req.user.id);
  }

  @Get()
  @DevOnly()
  async findAll() {
    // Fetches all requests for development purposes
    return this.requestsService.findAll();
  }
}
