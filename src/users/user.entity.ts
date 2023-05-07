import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from 'src/shared/enums/gender';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

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

  toResponse() {
    const {
      id,
      email,
      firstName,
      lastName,
      birthDate,
      gender,
      phone,
      citizenship,
    } = this;

    return {
      id,
      email,
      firstName,
      lastName,
      birthDate,
      gender,
      phone,
      citizenship,
    };
  }
}
