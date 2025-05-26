import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'apps/user/src/users.module';
import { HotelsModule } from 'apps/hotel/src/hotels.module';
import { RoomsModule } from 'apps/rooms/src/rooms.module';
import { User, Hotel, Room, Reserve, Review, Request } from '@entity/entities';
import { ReservesModule } from 'apps/reserves/src/reserves.module';
import { ReviewsModule } from 'apps/reviews/src/reviews.module';
import { RequestsModule } from 'apps/requests/src/requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [User, Hotel, Room, Reserve, Review, Request], //New entities
        synchronize: true, //Only dev
      }),
    }),
    //Add new projects
    UsersModule,
    HotelsModule,
    RoomsModule,
    ReservesModule,
    ReviewsModule,
    RequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
