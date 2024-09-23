import { atom } from "recoil";

export const selectedDepartureFlightAtom = atom({
  key: "selectedDepartureFlightAtom",
  default: JSON.parse(localStorage.getItem("selectedDepartureFlight")),
});

export const selectedReturnFlightAtom = atom({
  key: "selectedReturnFlightAtom",
  default: JSON.parse(localStorage.getItem("selectedReturnFlight")),
});
