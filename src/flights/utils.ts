import Chance from 'chance';
import { subDays, addDays, eachDayOfInterval } from 'date-fns';
import { FlightPriceDto } from './dto/flights-response.dto';
import {
  MINIMUM_SEATS_NUMBER,
  MAXIMUM_SEATS_NUMBER,
  NO_SEATS_CHANCE,
  FLIGHT_PRICE_DECIMAL_PLACES,
  EUR_USD_COEFF,
  EUR_RUB_COEFF,
  EUR_PLN_COEFF,
  MIN_FLIGHT_DURATION,
  MAX_FLIGHT_DURATION,
  AIRPORT_CONNECTIONS_CHANCE,
  MAXIMUM_AIRPORT_CONNECTIONS,
  MINIMUM_ADULT_FARE,
  MINIMUM_CHILD_FARE,
  MINIMUM_INFANT_FARE,
  MAXIMUM_ADULT_FARE,
  MAXIMUM_CHILD_FARE,
  MAXIMUM_INFANT_FARE,
  MINIMUM_ADDITIONAL_ARRIVAL_DELAY,
  MAXIMUM_ADDITIONAL_ARRIVAL_DELAY,
  ROUND_TO_MINUTES,
  DAYS_BEFORE_AFTER_FLIGHT,
} from './constants';
import { IATA_CODE_LENGTH } from 'src/shared/constants';
import { Passengers } from 'src/shared/interfaces/passengers';

export const generateFlightNumber = (chance: Chance.Chance): string => {
  return `${chance.string({
    length: 2,
    alpha: true,
    casing: 'upper',
  })} ${chance.string({ length: 4, numeric: true })}`;
};

export const generateSeatsNumber = (chance: Chance.Chance): number => {
  return chance.integer({
    min: MINIMUM_SEATS_NUMBER,
    max: MAXIMUM_SEATS_NUMBER,
  });
};

export const generateAvailableSeatsNumber = (
  chance: Chance.Chance,
  totalSeats: number,
  flightDate: Date,
): number => {
  if (new Date() > flightDate) {
    return 0;
  }

  const noSeatsChance = chance.integer({ min: 1, max: NO_SEATS_CHANCE });

  if (noSeatsChance === NO_SEATS_CHANCE) {
    return 0;
  }

  return chance.integer({ min: 1, max: totalSeats });
};

export const generatePrice = (
  chance: Chance.Chance,
  passengers: Passengers,
): FlightPriceDto => {
  const EUR = chance.floating({
    min:
      passengers.adults * MINIMUM_ADULT_FARE +
      passengers.children * MINIMUM_CHILD_FARE +
      passengers.infants * MINIMUM_INFANT_FARE,
    max:
      passengers.adults * MAXIMUM_ADULT_FARE +
      passengers.children * MAXIMUM_CHILD_FARE +
      passengers.infants * MAXIMUM_INFANT_FARE,
    fixed: FLIGHT_PRICE_DECIMAL_PLACES,
  });
  const USD = +(EUR * EUR_USD_COEFF).toFixed(FLIGHT_PRICE_DECIMAL_PLACES);
  const RUB = +(EUR * EUR_RUB_COEFF).toFixed(FLIGHT_PRICE_DECIMAL_PLACES);
  const PLN = +(EUR * EUR_PLN_COEFF).toFixed(FLIGHT_PRICE_DECIMAL_PLACES);

  return { EUR, USD, RUB, PLN };
};

export const generateFlightDuration = (chance: Chance.Chance): number => {
  return chance.integer({ min: MIN_FLIGHT_DURATION, max: MAX_FLIGHT_DURATION });
};

export const generateArrivalDelay = (chance: Chance.Chance) => {
  return chance.integer({
    min: MINIMUM_ADDITIONAL_ARRIVAL_DELAY,
    max: MAXIMUM_ADDITIONAL_ARRIVAL_DELAY,
  });
};

export const generateDepartureDate = (chance: Chance.Chance, date: Date) => {
  const dateCopy = new Date(date);
  const hours = chance.integer({ min: dateCopy.getHours(), max: 23 });
  const minutes =
    Math.floor(chance.minute() / ROUND_TO_MINUTES) * ROUND_TO_MINUTES;

  dateCopy.setHours(hours, minutes);

  return dateCopy;
};

export const generateFlightConnections = (chance: Chance.Chance): string[] => {
  const connectionsChance = chance.integer({
    min: 1,
    max: AIRPORT_CONNECTIONS_CHANCE,
  });

  if (connectionsChance === AIRPORT_CONNECTIONS_CHANCE) {
    const connections = [];

    for (let i = 0; i < MAXIMUM_AIRPORT_CONNECTIONS; i++) {
      connections.push(
        chance.string({
          length: IATA_CODE_LENGTH,
          alpha: true,
          casing: 'upper',
        }),
      );

      if (Math.random() > 0.5) {
        break;
      }
    }

    return connections;
  }

  return [];
};

export const generateDatesBeforeAfter = (date: Date): Date[] => {
  const start = subDays(date, DAYS_BEFORE_AFTER_FLIGHT);
  const end = addDays(date, DAYS_BEFORE_AFTER_FLIGHT);

  return eachDayOfInterval({
    start,
    end,
  });
};
