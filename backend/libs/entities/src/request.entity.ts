// src/request/request.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Reserve } from './reserve.entity';

export enum RequestStatus {
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.requests, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'admin_id' }) 
  admin: User;

  @ManyToOne(() => Reserve, (reserve) => reserve.requests, {
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'reserve_id' }) 
  reserve: Reserve;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.UNDER_REVIEW
  })
  status: RequestStatus;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true
  })
  updated_at: Date | null;
}