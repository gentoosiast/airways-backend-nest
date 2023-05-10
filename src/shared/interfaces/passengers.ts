export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export type PassengerCategory = keyof Passengers;
