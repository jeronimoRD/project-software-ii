import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository, Like, In, Between } from 'typeorm';
import { Room, RoomType } from '@entity/entities/room.entity';
import { Hotel } from '@entity/entities/hotel.entity';
import { ChangeStatusDto, CreateRoomDto, FilterRoomsHotelDto, FilterRoomsUniversalDto } from './dto/room.dto';
import { RoomServiceInterface } from './interface/room.interface';
import { UserRole } from '@entity/entities';

@Injectable()
export class RoomsService implements RoomServiceInterface {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    private configService: ConfigService,
  ) {}

  private sanitizeRoom(room: Room): Room {
    const sanitized  = { ...room };
    return sanitized;
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  async create(userId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    // 1. Validación de UUID del hotel
    if (!this.isValidUUID(createRoomDto.hotel)) {
        throw new BadRequestException('ID de hotel inválido');
    }

    const hotel = await this.hotelRepository.findOne({
      where: { id: createRoomDto.hotel },
      relations: ['user'],    
    });
    if (!hotel) {
      throw new NotFoundException('Hotel no encontrado');
    }

    if (hotel.user.id !== userId && hotel.user.role !== UserRole.DEV) {
      throw new UnauthorizedException(
        'Solo el administrador de este hotel puede crear habitaciones'
      );
    }

    // 4. Crear nueva habitación
    const room = this.roomRepository.create({
        ...createRoomDto,
        hotel: hotel,
        isOccupied: false
    });

    //Salvar room
    await this.roomRepository.save(room)

    return this.sanitizeRoom(room);
  }

  async changeStatus(changeStatusDto: ChangeStatusDto): Promise<Room> {
    const { roomId, isOccupied } = changeStatusDto;

    if (!this.isValidUUID(roomId)) {
      throw new BadRequestException(`El ID '${roomId}' no es un UUID válido.`);
    }

    // 2. Buscar la habitación
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException(`No existe la habitación con ID '${roomId}'.`);
    }

    // 3. Actualizar y guardar
    room.isOccupied = isOccupied;
    const updated = await this.roomRepository.save(room);

    return this.sanitizeRoom(updated);
  }

  async filterRoomsbyHotel(filterRoomsHotelDto: FilterRoomsHotelDto): Promise<Room[]> {
    if (!this.isValidUUID(filterRoomsHotelDto.hotel)) {
      throw new NotFoundException('Hotel inválido');
    }

    const hotel = await this.hotelRepository.findOneBy({ 
      id: filterRoomsHotelDto.hotel 
    });

    if (!hotel) {
      throw new NotFoundException('Hotel no encontrado');
    }

    const query: any = {
      where: {
        isOccupied: false,
        hotel: { id: filterRoomsHotelDto.hotel }
      }
    };

    if (filterRoomsHotelDto.capacity) {
      query.where.capacity = filterRoomsHotelDto.capacity;
    }

    if (filterRoomsHotelDto.type) {
      query.where.type = filterRoomsHotelDto.type;
    }

    if (filterRoomsHotelDto.price) {
      query.where.price = Between(
        filterRoomsHotelDto.price - 50, 
        filterRoomsHotelDto.price + 50
      );
    }

    const rooms = await this.roomRepository.find(query);
    return rooms.map(room => this.sanitizeRoom(room));
  }

  async filterRoomsUniversal(filterRoomsUniversalDto: FilterRoomsUniversalDto): Promise<Room[]> {
    const query: any = { where: { isOccupied: false } };

    if (filterRoomsUniversalDto.location) {
      const hotels = await this.hotelRepository.find({
        where: {
          location: Like(`%${filterRoomsUniversalDto.location}%`)
        }
      });

      if (hotels.length === 0) return [];
      
      query.where.hotel = { id: In(hotels.map(h => h.id)) };
    }

    if (filterRoomsUniversalDto.capacity) {
      query.where.capacity = filterRoomsUniversalDto.capacity;
    }

    if (filterRoomsUniversalDto.type) {
      query.where.type = filterRoomsUniversalDto.type;
    }

    if (filterRoomsUniversalDto.price) {
      query.where.price = Between(
        filterRoomsUniversalDto.price - 100,
        filterRoomsUniversalDto.price + 100
      );
    }

    const rooms = await this.roomRepository.find(query);
    return rooms.map(room => this.sanitizeRoom(room));
  }
}