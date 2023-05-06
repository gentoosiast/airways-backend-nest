import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Airport } from './airport.entity';

@Injectable()
export class AirportsService {
  constructor(
    @InjectRepository(Airport)
    private userRepository: Repository<Airport>,
  ) {}

  findByName(name: string) {
    return this.userRepository.find({ where: { name: Like(`${name}%`) } });
  }
}
