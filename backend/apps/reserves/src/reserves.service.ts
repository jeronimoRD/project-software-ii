import { Injectable } from '@nestjs/common';
import { ReserveServiceInterface } from './interfaces/reserve.interface';
import {
  CreateReserveDto,
  UpdateReserveDto,
  ApproveorRejectReserveDto,
} from './dto/reserve.dto';
import { Reserve } from '@entity/entities/reserve.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entity/entities/user.entity';
import { Room } from '@entity/entities/room.entity';
import { Repository } from 'typeorm';
import { Reserve as ReserveInterface } from './interfaces/reserve.interface';

@Injectable()
export class ReservesService implements ReserveServiceInterface {
  constructor(
    @InjectRepository(Reserve)
    private reserveRepository: Repository<Reserve>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
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

  async createReserve(
    createReserveDto: CreateReserveDto,
  ): Promise<ReserveInterface> {
    const { room: roomId, user: userId, startDate, endDate } = createReserveDto;

    const overlappingReserve = await this.reserveRepository
      .createQueryBuilder('reserve')
      .innerJoin('reserve.room', 'room')
      .where('room.id = :roomId', { roomId })
      .andWhere('reserve.startDate <= :endDate', { endDate })
      .andWhere('reserve.endDate >= :startDate', { startDate })
      .getOne();

    if (overlappingReserve) {
      throw new Error('Reserve overlaps with another reserve');
    }

    const roomEntity = await this.roomRepository.findOneBy({ id: roomId });
    if (!roomEntity) throw new Error('Room not found');
    const userEntity = await this.userRepository.findOneBy({ id: userId });
    if (!userEntity) throw new Error('User not found');

    const newReserve = this.reserveRepository.create({
      room: roomEntity,
      user: userEntity,
      startDate,
      endDate,
    });

    const savedReserve = await this.reserveRepository.save(newReserve);
    const reserveWithRelations = await this.reserveRepository.findOne({
      where: { id: savedReserve.id },
      relations: ['room', 'user'],
    });
    if (!reserveWithRelations)
      throw new Error('Reserve not found after creation');
    return this.sanitizeReserve(reserveWithRelations);
  }

  async updateReserve(
    updateReserveDto: UpdateReserveDto,
  ): Promise<ReserveInterface> {
    const {
      id,
      room: roomId,
      user: userId,
      startDate,
      endDate,
      status,
    } = updateReserveDto;
    const reserve = await this.reserveRepository.findOne({
      where: { id },
      relations: ['room', 'user'],
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

  async adminApproveOrRejectReserve(
    ApproveorRejectReserveDto: ApproveorRejectReserveDto,
  ): Promise<ReserveInterface> {
    const { id, decision } = ApproveorRejectReserveDto;
    const reserve = await this.reserveRepository.findOne({
      where: { id },
      relations: ['room', 'user'],
    });
    if (!reserve) throw new Error('Reserve not found');

    if (decision === 'approve') {
      reserve.status = 'confirmed';
    } else if (decision === 'reject') {
      reserve.status = 'rejected';
    } else {
      throw new Error('Invalid decision');
    }

    const savedReserve = await this.reserveRepository.save(reserve);
    return this.sanitizeReserve(savedReserve);
  }
}
