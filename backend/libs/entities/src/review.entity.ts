import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from './hotel.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => Hotel, hotel => hotel.reviews)
  @JoinColumn()
  hotel: Hotel;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn()
  user:User;
}