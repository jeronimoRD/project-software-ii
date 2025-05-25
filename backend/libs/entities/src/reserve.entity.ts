import { Room } from './room.entity';
import { User } from './user.entity';
import { Request } from './request.entity';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';

export enum reserveStatus {
  RESERVED = 'reserved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  PENDING = 'pending'
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
    default: reserveStatus.PENDING,
  })
  status: string;

  @OneToOne(() => Request, (request) => request.reserve)
  request: Request;
}
