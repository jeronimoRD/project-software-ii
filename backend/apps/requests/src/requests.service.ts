import { RequestStatus, Reserve, User, Request, reserveStatus } from '@entity/entities';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto, ResponseRequestDto } from './dto/request.dto';
import { EmailService } from '@email/email/email.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(Reserve)
    private reserveRepository: Repository<Reserve>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  private sanitizeRequest(request: Request): Request {
    const sanitized = { ...request };
    return sanitized;
  }

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const { adminId, reserveId } = createRequestDto;

    const admin = await this.userRepository.findOneBy({ id: adminId });
    if (!admin) throw new NotFoundException(`Admin con ID ${adminId} no encontrado`);

    const reserve = await this.reserveRepository.findOne({
      where: { id: reserveId },
      relations: ['request'],
    });
    if (!reserve) throw new NotFoundException(`Reserve con ID ${reserveId} no encontrada`);

    // Asignar admin y reserva
    const request = this.requestRepository.create({
      ...createRequestDto,
      status: RequestStatus.UNDER_REVIEW,
    });

    // Guardar
    const saved = await this.requestRepository.save(request);
    return this.sanitizeRequest(saved);
  }

  async updateStatus(user_id, responseRequestDto: ResponseRequestDto): Promise<void> {
    const { requestId, status } = responseRequestDto;

    // 1) Buscar la request con reserva y admin
    const request = await this.requestRepository.findOne({
      where: { id: requestId },
      relations: ['reserve', 'admin'],  
    });
    if (!request) {
      throw new NotFoundException(`Request con ID ${requestId} no encontrada`);
    }

    // 2) Verificar que el userId coincida con el admin de la request
    if (request.admin.id !== user_id) {
      throw new UnauthorizedException(
        'Solo el administrador asignado a esta solicitud puede responderla',
      );
    }

    // 2. Actualizar estado de la request
    request.status = status;
    const updatedRequest = await this.requestRepository.save(request);

    // 3. Mapear estado de request a estado de reserva
    const reserve = updatedRequest.reserve;
    switch (status) {
      case RequestStatus.APPROVED:
        reserve.status = reserveStatus.RESERVED;
        break;
      case RequestStatus.REJECTED:
        reserve.status = reserveStatus.REJECTED;
        break;
      default:
        break;
    }
    if (reserve.status === reserveStatus.REJECTED) {
      await this.emailService.sendReserveRejectionEmail(reserve.user.email, reserve.user.firstName);
    }
    if (reserve.status === reserveStatus.RESERVED) {
      await this.emailService.sendReserveConfirmationEmail(reserve.user.email, reserve.user.firstName);
    }
    await this.reserveRepository.save(reserve);
  }

  async findByAdmin(adminId: string): Promise<Request[]> {
    const requests = await this.requestRepository.find({
      where: { admin: { id: adminId } },
      relations: ['admin', 'reserve'],
      order: { created_at: 'DESC' },
    });
    return requests.map(r => this.sanitizeRequest(r));
  }

  // -----------------------------------------------------
  // Encuentra todas las Requests (solo para DEV)
  async findAll(): Promise<Request[]>{
    const requests = await this.requestRepository.find({
      relations: ['admin', 'reserve'],
      order: { created_at: 'DESC' },
    });
    return requests.map(r => this.sanitizeRequest(r));
  }
}
