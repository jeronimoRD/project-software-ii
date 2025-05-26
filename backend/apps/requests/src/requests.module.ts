import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request, Reserve, User } from '@entity/entities';
import { EmailModule } from '@email/email/email.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Request, User, Reserve]),
      EmailModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
