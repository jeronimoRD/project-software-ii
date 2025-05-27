import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from './hotel.entity';
import { User } from './user.entity';

@Entity() // Marks the class as a database entity
export class Review {
  @PrimaryGeneratedColumn('uuid') // Automatically generates a unique identifier for each review
  id: string;

  @Column() // Defines a column for the review title
  title: string;

  @Column() // Defines a column for the review content
  content: string;

  @Column({ 
    type: 'decimal', // Specifies the data type as decimal
    precision: 3, // Sets the total number of digits
    scale: 2, // Sets the number of digits after the decimal point
    default: 0, // Sets the default value to 0
    transformer: { // Defines how to transform the value when saving and retrieving from the database
        to: (value: number) => value, // No transformation needed when saving
        from: (value: string) => parseFloat(value) // Converts string to float when retrieving
    }
  })
  rating: number;

  @ManyToOne(() => Hotel, hotel => hotel.reviews) // Establishes a many-to-one relationship with the Hotel entity
  @JoinColumn({ name: 'hotel_id' }) // Specifies the foreign key column name in the database
  hotel: Hotel;

  @ManyToOne(() => User, user => user.reviews) // Establishes a many-to-one relationship with the User entity
  @JoinColumn({ name: 'user_id' }) // Specifies the foreign key column name in the database
  user: User;
}
