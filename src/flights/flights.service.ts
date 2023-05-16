import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Chance } from 'chance';
import { addMinutes, isPast } from 'date-fns';
import { FlightsSearchDto } from './dto/flights-search.dto';
import { AirportsService } from 'src/airports/airports.service';
import { FlightsInfoDto, FlightsResponseDto } from './dto/flights-response.dto';
import { AirportEntity } from 'src/airports/airport.entity';
import {
  generateArrivalDelay,
  generateAvailableSeatsNumber,
  generateDatesBeforeAfter,
  generateDepartureDate,
  generateFlightConnections,
  generateFlightDuration,
  generateFlightNumber,
  generatePrice,
  generateSeatsNumber,
} from './utils';
import { Passengers } from 'src/shared/interfaces/passengers';

@Injectable()
export class FlightsService {
  constructor(
    @Inject(AirportsService) private airportsService: AirportsService,
  ) {}

  async getFlights(flightsDto: FlightsSearchDto): Promise<FlightsResponseDto> {
    const departureAirport = await this.airportsService.findByIATA(
      flightsDto.departureIATA,
    );

    if (!departureAirport) {
      throw new NotFoundException('Departure airport not found');
    }

    const arrivalAirport = await this.airportsService.findByIATA(
      flightsDto.arrivalIATA,
    );

    if (!arrivalAirport) {
      throw new NotFoundException('Arrival airport not found');
    }

    const passengers: Passengers = {
      adults: flightsDto.adults,
      children: flightsDto.children,
      infants: flightsDto.infants,
    };

    const flightDate = new Date(flightsDto.flightDate);
    const returnDate = flightsDto.returnDate
      ? new Date(flightsDto.returnDate)
      : null;

    if (isPast(flightDate)) {
      throw new BadRequestException('Flight date is in the past');
    }

    if (returnDate && isPast(returnDate)) {
      throw new BadRequestException('Return flight date is in the past');
    }

    return {
      flights: generateDatesBeforeAfter(new Date(flightDate)).map((date) => {
        return this.generateFlight(
          departureAirport,
          arrivalAirport,
          date,
          passengers,
        );
      }),

      returnFlights: returnDate
        ? generateDatesBeforeAfter(new Date(returnDate)).map((date) => {
            return this.generateFlight(
              arrivalAirport,
              departureAirport,
              date,
              passengers,
            );
          })
        : undefined,
    };
  }

  private generateFlight(
    departureAirport: AirportEntity,
    arrivalAirport: AirportEntity,
    flightDate: Date,
    passengers: Passengers,
  ): FlightsInfoDto {
    const chance = new Chance();
    const departureDate = generateDepartureDate(chance, flightDate);
    const flightDuration = generateFlightDuration(chance);
    const seats = generateSeatsNumber(chance);

    return {
      flightNumber: generateFlightNumber(chance),
      departureAirport,
      arrivalAirport,
      departureDate: departureDate.toISOString(),
      arrivalDate: addMinutes(
        departureDate,
        flightDuration + generateArrivalDelay(chance),
      ).toISOString(),
      flightDuration,
      price: generatePrice(chance, passengers),
      seats,
      availableSeats: generateAvailableSeatsNumber(
        chance,
        seats,
        departureDate,
      ),
      connections: generateFlightConnections(chance),
    };
  }
}
