export type FlightType = {
  airline: string;
  airline_logo: string;
  start_location: string;
  destination: string;
  start_time: string;
  duration: string;
  mode: string;
  type: string;
  class: string;
  date: string;
  price: number;
  start_airport: string;
  destination_airport: string;
  id: string;
};

export type FlightModeType = {
  value: string;
  label: string;
};

export type FlightClassType = {
  value: string;
  label: string;
};
export type UserFilterType = {
  startLocation?: string;
  startAirport?: string;
  destination?: string;
  destinationAirport?: string;
  startTime?: string;
  flightType?: string;
  flightClass?: string;
  flightMode?: string;
  minPrice?: number;
  maxPrice?: number;
  numberOfTravellers: number;
};
