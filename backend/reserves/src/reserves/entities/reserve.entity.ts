import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { reserveStatus } from '../dto/reserve.dto';

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  userId: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: String, enum: Object.values(reserveStatus), default: reserveStatus.RESERVED })
  status: string;
}