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

@Entity() // Decorator to define the class as a database entity
export class Room {
    @PrimaryGeneratedColumn('uuid') // Automatically generates a unique identifier for the room
    id: string;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms) // Establishes a many-to-one relationship with the Hotel entity
    @JoinColumn({ name: 'hotel_id' }) // Specifies the foreign key column in the Room table
    hotel: Hotel;

    @OneToMany(() => Reserve, (reserve) => reserve.room) // Establishes a one-to-many relationship with the Reserve entity
    reserves: Reserve[];
    
    @Column({ type: 'int' }) // Defines the capacity of the room as an integer
    capacity: number;

    @Column({
        type: 'enum', // Specifies that the type is an enumeration
        enum: RoomType, // Links the enum RoomType to this column
        default: RoomType.STANDARD // Sets the default value to STANDARD
    })
    type: RoomType;

    @Column({ 
        type: 'decimal', // Defines the price as a decimal type
        precision: 10, // Total number of digits
        scale: 2, // Number of digits after the decimal point
        default: 0 // Sets the default price to 0
    })
    price: number;

    @Column({ default: false }) // Indicates whether the room is occupied, defaulting to false
    isOccupied: boolean;
}
