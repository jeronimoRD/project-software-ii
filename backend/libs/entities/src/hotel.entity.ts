import { Entity, Column, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity() // Marks the class as a database entity
export class Hotel {
  @PrimaryGeneratedColumn('uuid') // Automatically generates a unique identifier for each hotel
  id: string;

  @OneToMany(() => Room, (room) => room.hotel) // Establishes a one-to-many relationship with the Room entity
  rooms: Room[];

  @OneToMany(() => Review, (review) => review.hotel) // Establishes a one-to-many relationship with the Review entity
  reviews: Review[];

  @Column({ length: 255, unique: true }) // Defines the name column with a maximum length and uniqueness constraint
  name: string;

  @Column({ length: 255 }) // Defines the location column with a maximum length
  location: string;

  @Column({
    default: 'https://ejemplo.com/foto-default.jpg', // Sets a default photo URL for the hotel
    length: 500,
  })
  photo: string;

  @Column({
    default: 'Descripción no disponible', // Sets a default description for the hotel
    length: 2000,
  })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) // Defines the lower price column with decimal precision
  lower_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) // Defines the higher price column with decimal precision
  higher_price: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 }) // Defines the rating column with decimal precision
  rating: number;

  @OneToOne(() => User, (user) => user.hotel) // Establishes a one-to-one relationship with the User entity
  @JoinColumn({ name: 'user_id' }) // Specifies the foreign key column for the user relationship
  user: User;
}
