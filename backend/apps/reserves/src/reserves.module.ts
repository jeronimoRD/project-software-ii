import { Module } from '@nestjs/common';
import { ReservesController } from './reserves.controller';
import { ReservesService } from './reserves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from '@entity/entities/reserve.entity';
import { User } from '@entity/entities/user.entity';
import { Room } from '@entity/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve, User, Room])],
  controllers: [ReservesController],
  providers: [ReservesService],
  exports: [ReservesService],
})
export class ReservesModule {}
