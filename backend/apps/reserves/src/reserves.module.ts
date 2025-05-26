import { Module } from '@nestjs/common';
import { ReservesController } from './reserves.controller';
import { ReservesService } from './reserves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from '@entity/entities/reserve.entity';
import { User } from '@entity/entities/user.entity';
import { UsersModule } from 'apps/user/src/users.module';
import { RoomsModule } from 'apps/rooms/src/rooms.module';
import { Room, Request } from '@entity/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserve, User, Room, Request]),
    UsersModule,
    RoomsModule,
    EmailModule,
  ],
  controllers: [ReservesController],
  providers: [ReservesService],
  exports: [ReservesService],
})
export class ReservesModule {}
