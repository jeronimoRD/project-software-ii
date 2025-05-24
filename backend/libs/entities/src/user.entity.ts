import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserve } from './reserve.entity';

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

  @Column({ type: String, enum: Object.values(UserRole), default: UserRole.USER })
  role: UserRole;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  refreshToken?: string;
}