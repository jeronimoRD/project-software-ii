import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Reserve } from './reserve.entity';
import { Request } from './request.entity';
import { Review } from './review.entity';
import { Hotel } from './hotel.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  DEV = 'dev'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Reserve, (room) => room.user)
  reserves: Reserve[];

  @OneToOne(() => Hotel, (hotel) => hotel.user) 
  hotel: Hotel;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToMany(() => Request, (request) => request.admin)
  requests: Request[];
}