import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsModule } from './requests.module';
import { User, Hotel, Reserve, Review, Room, Request } from '@entity/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load configuration globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule for database configuration
      inject: [ConfigService], // Inject ConfigService to access configuration values
      useFactory: (config: ConfigService) => ({
        type: 'mysql', // Specify the database type
        host: config.get('MYSQL_HOST'), // Get MySQL host from configuration
        port: config.get('MYSQL_PORT'), // Get MySQL port from configuration
        username: config.get('MYSQL_USER'), // Get MySQL username from configuration
        password: config.get('MYSQL_PASSWORD'), // Get MySQL password from configuration
        database: config.get('MYSQL_DATABASE'), // Get MySQL database name from configuration
        entities: [Hotel, Room, Review, User, Reserve, Request], // Define entities for TypeORM
        synchronize: true, // Automatically synchronize the database schema
      }),
    }),
    RequestsModule,  // Only dev
  ],
})
export class AppModule {}
