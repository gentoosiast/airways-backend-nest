import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AirportEntity } from './airport.entity';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(AirportEntity)
    private airportRepository: Repository<AirportEntity>,
  ) {}

  async findByCity(city: string): Promise<AirportEntity[]> {
    return this.airportRepository.find({
      where: { city: ILike(`%${city}%`) },
    });
  }

  async findByIATA(iata_code: string): Promise<AirportEntity | null> {
    return this.airportRepository.findOneBy({ iata_code });
  }
}
