import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReserveServiceInterface } from './interfaces/reserve.interface';
import { CreateReserveDto, UpdateReserveDto } from './dto/reserve.dto';
import { Reserve } from '@entity/entities/reserve.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entity/entities/user.entity';
import { Room } from '@entity/entities/room.entity';
import { Repository } from 'typeorm';
import { Reserve as ReserveInterface } from './interfaces/reserve.interface';
import { Request, RequestStatus } from '@entity/entities';
import { EmailService } from '@email/email/email.service';

@Injectable()
export class ReservesService implements ReserveServiceInterface {
  constructor(
    @InjectRepository(Reserve)
    private reserveRepository: Repository<Reserve>,
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private emailService: EmailService,
  ) {}
  private sanitizeReserve(reserve: Reserve): ReserveInterface {
    return {
      id: reserve.id,
      roomId: reserve.room.id,
      userId: reserve.user.id,
      startDate: reserve.startDate,
      endDate: reserve.endDate,
      status: reserve.status,
    };
  }

  async createReserve(userId: string, dto: CreateReserveDto): Promise<ReserveInterface> {
    const { roomId, startDate, endDate } = dto;

    // 1. Validaciones básicas
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la de fin');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);

    // trae la habitación junto con su hotel y el usuario (admin) del hotel
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['hotel', 'hotel.user'],
    });
    if (!room) throw new NotFoundException(`Habitación con ID ${roomId} no encontrada`);
    if (room.isOccupied) {
      throw new ConflictException('La habitación ya está marcada como ocupada');
    }

    // 2. Comprobar solapamiento de fechas
    const overlap = await this.reserveRepository
      .createQueryBuilder('r')
      .innerJoin('r.room', 'room')
      .where('room.id = :roomId', { roomId })
      .andWhere('r.startDate <= :endDate', { endDate })
      .andWhere('r.endDate >= :startDate', { startDate })
      .getOne();
    if (overlap) {
      throw new ConflictException('Ya existe una reserva solapada en ese rango de fechas');
    }

    // 3. Crear y guardar la reserva
    const reserve = this.reserveRepository.create({
      room,
      user,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: 'pending',
    });
    const savedReserve = await this.reserveRepository.save(reserve);

    // 4. Marcar la habitación como ocupada
    room.isOccupied = true;
    await this.roomRepository.save(room);

    // 5. Crear la Request para el admin del hotel
    const hotelAdmin = room.hotel.user;
    if (!hotelAdmin) {
      // por si alguien no ha asignado admin al hotel
      throw new NotFoundException('Este hotel no tiene un admin asignado');
    }
    const req = this.requestRepository.create({
      admin: hotelAdmin,
      reserve: savedReserve,
      status: RequestStatus.UNDER_REVIEW,
    });
    await this.requestRepository.save(req);
    await this.emailService.sendReserveCreationEmail( savedReserve.user.email, savedReserve.user.firstName);
    await this.emailService.sendReserveNotificationEmail( hotelAdmin.email, hotelAdmin.firstName, savedReserve);
    // 6. Devolver la reserva "sanitizada"
    return this.sanitizeReserve(savedReserve);
  }

  async updateReserve(updateReserveDto: UpdateReserveDto): Promise<ReserveInterface> {
    const { id, room: roomId, user: userId, startDate, endDate, status } = updateReserveDto;
    const reserve = await this.reserveRepository.findOne({ 
      where: { id }, 
      relations: ['room', 'user'] 
    });
    if (!reserve) throw new Error('Reserve not found');

    let newRoom = reserve.room;
    if (roomId) {
      const roomEntity = await this.roomRepository.findOneBy({ id: roomId });
      if (!roomEntity) throw new Error('Room not found');
      newRoom = roomEntity;
    }

    let newUser = reserve.user;
    if (userId) {
      const userEntity = await this.userRepository.findOneBy({ id: userId });
      if (!userEntity) throw new Error('User not found');
      newUser = userEntity;
    }

    const newStartDate = startDate ?? reserve.startDate;
    const newEndDate = endDate ?? reserve.endDate;

    const overlappingReserve = await this.reserveRepository
      .createQueryBuilder('reserve')
      .innerJoin('reserve.room', 'room')
      .where('room.id = :roomId', { roomId: newRoom.id })
      .andWhere('reserve.startDate <= :endDate', { endDate: newEndDate })
      .andWhere('reserve.endDate >= :startDate', { startDate: newStartDate })
      .andWhere('reserve.id != :id', { id })
      .getOne();

    if (overlappingReserve) {
      throw new Error('Reserve overlaps with another reserve');
    }

    reserve.room = newRoom;
    reserve.user = newUser;
    reserve.startDate = newStartDate;
    reserve.endDate = newEndDate;
    if (status) reserve.status = status;

    const updatedReserve = await this.reserveRepository.save(reserve);
    const reserveWithRelations = await this.reserveRepository.findOne({
      where: { id: updatedReserve.id },
      relations: ['room', 'user'],
    });
    if (!reserveWithRelations)
      throw new Error('Reserve not found after update');
    return this.sanitizeReserve(reserveWithRelations);
  }
}