import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservesModule } from './reserves/reserves.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('MONGODB_URI'),
        port: 27017,
        username: configService.get('MONGODB_USERNAME'),
        password: configService.get('MONGODB_PASSWORD'),
        database: configService.get('MONGODB_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    ReservesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
