import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Gender } from 'src/shared/enums/gender';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column()
  phone: string;

  @Column()
  citizenship: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
