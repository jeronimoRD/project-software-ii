import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request, Reserve, User } from '@entity/entities';

@Module({
  imports: [
      TypeOrmModule.forFeature([Request, User, Reserve])
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
