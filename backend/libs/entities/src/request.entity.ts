// src/request/request.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Reserve } from './reserve.entity';

export enum requestStatus {
  RESERVED = 'reserved',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  PENDING = 'pending'
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.requests)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @OneToOne(() => Reserve, (reserve) => reserve.request)
  @JoinColumn({ name: 'reserve_id' })
  reserve: Reserve;

  @Column({
    type: 'enum',
    enum: requestStatus,
    default: requestStatus.PENDING,
  })
  status: requestStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}