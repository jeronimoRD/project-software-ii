import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';
import { User, Hotel, Reserve, Review, Room, Request} from '@entity/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: config.get('MYSQL_PORT'),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASSWORD'),
        database: config.get('MYSQL_DATABASE'),
        entities: [User, Hotel, Room, Reserve, Review, Request],
        synchronize: true,
      }),
    }),
    UsersModule,  //Only dev
  ],
})
export class AppModule {}