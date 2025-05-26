import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from './hotel.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ 
    type: 'decimal', 
    precision: 3, 
    scale: 2,
    default: 0,
    transformer: {
        to: (value: number) => value,
        from: (value: string) => parseFloat(value)
    }
  })
  rating: number;

  @ManyToOne(() => Hotel, hotel => hotel.reviews)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;
}