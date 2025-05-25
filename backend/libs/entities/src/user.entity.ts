import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserve } from './reserve.entity';
import { Review } from './review.entity';

export enum UserRole {
  admin = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @OneToMany(() => Reserve, (room) => room.user)
  reserves: Reserve[];

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

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  refreshToken?: string;
}