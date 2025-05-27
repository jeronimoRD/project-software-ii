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
  UNDER_REVIEW = 'under_review', // Status indicating the request is currently being reviewed
  APPROVED = 'approved', // Status indicating the request has been approved
  REJECTED = 'rejected' // Status indicating the request has been rejected
}

@Entity() // Decorator to define the class as a TypeORM entity
export class Request {
  @PrimaryGeneratedColumn('uuid') // Automatically generates a unique identifier for the request
  id: string;

  @ManyToOne(() => User, (user) => user.requests, { 
    onDelete: 'CASCADE' // Deletes requests if the associated user is deleted
  })
  @JoinColumn({ name: 'admin_id' }) // Specifies the foreign key column for the admin
  admin: User;

  @ManyToOne(() => Reserve, (reserve) => reserve.requests, {
    onDelete: 'CASCADE' // Deletes requests if the associated reserve is deleted
  })
  @JoinColumn({ name: 'reserve_id' }) // Specifies the foreign key column for the reserve
  reserve: Reserve;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.UNDER_REVIEW // Sets the default status of the request
  })
  status: RequestStatus;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP' // Sets the creation timestamp to the current time
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP', // Updates the timestamp to the current time on modification
    nullable: true // Allows the updated_at field to be null
  })
  updated_at: Date | null;
}
