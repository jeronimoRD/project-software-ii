import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from '@entity/entities/room.entity';
import { Hotel } from '@entity/entities/hotel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Hotel]), 
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}