import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AirportEntity } from './airport.entity';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(AirportEntity)
    private airportRepository: Repository<AirportEntity>,
  ) {}

  findByCity(city: string) {
    return this.airportRepository.find({ where: { city: Like(`${city}%`) } });
  }
}
