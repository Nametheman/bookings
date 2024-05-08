import { create } from "zustand";
import { FlightType, UserFilterType } from "@/types/types";
import flightData from "@/helpers/flightData";

interface IFlightDataState {
  statefulFlightData: FlightType[];
  setFlightData: (data: FlightType[]) => void;
  filterFlightDataSearch: (data: UserFilterType) => void;
  getMinPrice: () => number;
  getMaxPrice: () => number;
  clearFilter: () => void;
  filterByClass: (flightClass: string) => void;
  filterByMode: (flightMode: string) => void;
}
const useFlightDataStore = create<IFlightDataState>((set) => ({
  statefulFlightData: flightData,
  setFlightData: (data) => set({ statefulFlightData: data }),
  filterFlightDataSearch: (userCriteria: UserFilterType) => {
    console.log(userCriteria);
    let copiedData = [...flightData];
    let filteredData = copiedData.filter((flight) => {
      return (
        flight.start_airport === userCriteria.startAirport &&
        flight.start_location === userCriteria.startLocation &&
        flight.destination === userCriteria.destination &&
        flight.destination_airport === userCriteria.destinationAirport &&
        flight.start_time === userCriteria.startTime &&
        flight.type === userCriteria.flightType &&
        flight.class === userCriteria.flightClass
      );
    });

    set({ statefulFlightData: filteredData });
  },
  getMinPrice: () => {
    return Math.min(...flightData.map((flight) => flight.price));
  },
  getMaxPrice: () => {
    return Math.max(...flightData.map((flight) => flight.price));
  },
  clearFilter: () => {
    set({ statefulFlightData: flightData });
  },
  filterByClass: (flightClass: string) => {
    let copiedData = [...flightData];
    let filteredData = copiedData.filter((flight) => {
      return flight.class === flightClass;
    });
    set({ statefulFlightData: filteredData });
  },
  filterByMode: (flightMode: string) => {
    let copiedData = [...flightData];
    let filteredData = copiedData.filter((flight) => {
      return flight.mode === flightMode;
    });
    set({ statefulFlightData: filteredData });
  },
}));

export default useFlightDataStore;
