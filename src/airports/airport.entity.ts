import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Airport {
  @PrimaryColumn()
  iata_code: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
