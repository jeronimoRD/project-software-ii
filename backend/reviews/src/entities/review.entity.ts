import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from '../../../hotels/src/hotels/entities/hotel.entity';

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
}