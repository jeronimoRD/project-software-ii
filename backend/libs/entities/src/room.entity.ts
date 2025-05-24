import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { Reserve } from './reserve.entity';

export enum RoomType {
  STANDARD = 'standard',
  SUITE = 'suite',
  FAMILIAR = 'familiar',
}

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    @JoinColumn({ name: 'hotel_id' }) 
    hotel: Hotel;

    @OneToMany(() => Reserve, (reserve) => reserve.room)
    reserves: Reserve[];
    
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