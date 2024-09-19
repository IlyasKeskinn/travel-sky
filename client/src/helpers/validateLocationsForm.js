export const validateLocationsForm = (
  departureLocation,
  arrivalLocation,
  departureDate,
  returnDate,
  tripType
) => {
  const newErrors = {};
  if (!departureLocation)
    newErrors.departureLocation = "Departure location is required.";
  if (!arrivalLocation)
    newErrors.arrivalLocation = "Arrival location is required.";
  if (!departureDate) newErrors.departureDate = "Departure date is required.";
  if (tripType === "round-trip" && !returnDate)
    newErrors.returnDate = "Return date is required for round-trip.";
  if (returnDate && departureDate && returnDate < departureDate) {
    newErrors.returnDate = "Return date cannot be earlier than departure date.";
  }
  return newErrors;
};
