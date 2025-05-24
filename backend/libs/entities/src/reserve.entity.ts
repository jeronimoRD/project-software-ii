import { Room } from './room.entity';
import { User } from './user.entity';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    JoinColumn
} from 'typeorm';
export enum reserveStatus {
  RESERVED = 'reserved',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Room, (room) => room.reserves)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @ManyToOne(() => User, (user) => user.reserves)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: Object.values(reserveStatus),
    default: reserveStatus.RESERVED,
  })
  status: string;
}
