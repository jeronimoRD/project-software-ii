import { Room } from './room.entity';
import { User } from './user.entity';
import { Request } from './request.entity';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany
} from 'typeorm';

// Enum representing the various statuses a reservation can have
export enum reserveStatus {
  RESERVED = 'reserved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending'
}

@Entity() // Decorator indicating that this class is an entity
export class Reserve {
  @PrimaryGeneratedColumn('uuid') // Automatically generates a unique identifier for each reserve
  id: string;

  @ManyToOne(() => Room, (room) => room.reserves) // Establishes a many-to-one relationship with the Room entity
  @JoinColumn({ name: 'room_id' }) // Specifies the foreign key column in the database
  room: Room;

  @ManyToOne(() => User, (user) => user.reserves) // Establishes a many-to-one relationship with the User entity
  @JoinColumn({ name: 'user_id' }) // Specifies the foreign key column in the database
  user: User;

  @Column() // Defines a column for the start date of the reservation
  startDate: Date;

  @Column() // Defines a column for the end date of the reservation
  endDate: Date;

  @Column({
    type: 'enum', // Specifies that this column will store an enum type
    enum: Object.values(reserveStatus), // Maps the enum values to the column
    default: reserveStatus.PENDING, // Sets the default status to PENDING
  })
  status: string;

  @OneToMany(() => Request, (request) => request.reserve) // Establishes a one-to-many relationship with the Request entity
  requests: Request[];
}
