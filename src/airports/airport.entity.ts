import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AirportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  iata_code: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
