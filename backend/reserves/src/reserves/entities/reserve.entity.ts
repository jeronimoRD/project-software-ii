import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { reserveStatus } from '../dto/reserve.dto';
import { Room } from '@hotels/rooms/entities/room.entity';
import { User } from '@users/users/entities/user.entity';

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Room, (room) => room.id)
  roomId: string;

  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: String,
    enum: Object.values(reserveStatus),
    default: reserveStatus.RESERVED,
  })
  status: string;
}
