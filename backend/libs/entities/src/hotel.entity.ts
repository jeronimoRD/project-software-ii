import { Entity, Column, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Room } from './room.entity'
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  @OneToMany(() => Review, (review) => review.hotel)
  reviews: Review[];

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  location: string;

  @Column({
    default: 'https://ejemplo.com/foto-default.jpg',
    length: 500
  })
  photo: string;

  @Column({
    default: 'Descripción no disponible',
    length: 2000
  })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  lower_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  higher_price: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @OneToOne(() => User, (user) => user.hotel) 
  @JoinColumn() 
  user: User
}