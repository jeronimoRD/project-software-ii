import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Hotel } from '../../hotels/entities/hotel.entity';
import { RoomType } from '../dto/room.dto';

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    @JoinColumn({ name: 'hotel_id' }) 
    hotel: Hotel;

    @Column({ type: 'int' })
    capacity: number;

    @Column({
        type: 'enum',
        enum: RoomType,
        default: RoomType.STANDARD
    })
    type: RoomType;

    @Column({ 
        type: 'decimal', 
        precision: 10, 
        scale: 2,
        default: 0 
    })
    price: number;

    @Column({ default: false })
    isOccupied: boolean;
}