import Chance from 'chance';
import { subDays, addDays, eachDayOfInterval } from 'date-fns';
import { FlightPriceDto, PricesDto } from './dto/flights-response.dto';
import {
  MINIMUM_SEATS_NUMBER,
  MAXIMUM_SEATS_NUMBER,
  NO_SEATS_CHANCE,
  PRICE_DECIMAL_PLACES,
  EUR_USD_COEFF,
  EUR_RUB_COEFF,
  EUR_PLN_COEFF,
  MIN_FLIGHT_DURATION,
  MAX_FLIGHT_DURATION,
  AIRPORT_CONNECTIONS_CHANCE,
  MAXIMUM_AIRPORT_CONNECTIONS,
  MINIMUM_INFANT_FARE,
  MAXIMUM_INFANT_FARE,
  MINIMUM_INFANT_TAX,
  MAXIMUM_INFANT_TAX,
  CHILDREN_PRICE_MULTIPLIER,
  ADULTS_PRICE_MULTIPLIER,
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

const calculatePrices = (priceEUR: number): PricesDto => {
  return {
    EUR: +priceEUR.toFixed(PRICE_DECIMAL_PLACES),
    USD: +(priceEUR * EUR_USD_COEFF).toFixed(PRICE_DECIMAL_PLACES),
    RUB: +(priceEUR * EUR_RUB_COEFF).toFixed(PRICE_DECIMAL_PLACES),
    PLN: +(priceEUR * EUR_PLN_COEFF).toFixed(PRICE_DECIMAL_PLACES),
  }
}

export const generatePrice = (
  chance: Chance.Chance,
  passengers: Passengers,
): FlightPriceDto => {
  const infantFare = chance.floating({min: MINIMUM_INFANT_FARE, max: MAXIMUM_INFANT_FARE}); 
  const infantTax = chance.floating({min: MINIMUM_INFANT_TAX, max: MAXIMUM_INFANT_TAX});
  const childFare = infantFare * CHILDREN_PRICE_MULTIPLIER;
  const childTax = infantTax * CHILDREN_PRICE_MULTIPLIER;
  const adultFare = infantFare * ADULTS_PRICE_MULTIPLIER;
  const adultTax = infantTax * ADULTS_PRICE_MULTIPLIER;

  const totalAdultsPrice = passengers.adults * (adultFare + adultTax);
  const totalChildrenPrice = passengers.children * (childFare + childTax);
  const totalInfantsPrice = passengers.infants * (infantFare + infantTax);

  const totalPrice = totalAdultsPrice + totalChildrenPrice + totalInfantsPrice;

  return {
    total: calculatePrices(totalPrice),
    adults: {
      fare: calculatePrices(adultFare),
      tax: calculatePrices(adultTax),
    },
    children: {
      fare: calculatePrices(childFare),
      tax: calculatePrices(childTax),
    },
    infants: {
      fare: calculatePrices(infantFare),
      tax: calculatePrices(infantTax),
    }
  }
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
