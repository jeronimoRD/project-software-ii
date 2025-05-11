import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';
import { ReservesController } from './reserves.controller';
import { ReservesService } from './reserves.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve])],
  controllers: [ReservesController],
  providers: [ReservesService],
  exports: [ReservesService],
})
export class ReservesModule {}
