import { atom } from "recoil";

export const flightFilterAtom = atom({
  key: "FlightFilterAtom",
  default: {
    departureLocation: { value: "AMS", label: "Amsterdam, The Netherlands" },
    arrivalLocation: null,
    departureDate: null,
    returnDate: null,
    tripType: "one-way",
    isArrivalFlight: false,
  },
});
