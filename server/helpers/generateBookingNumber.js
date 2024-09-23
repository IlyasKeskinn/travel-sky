// Function to generate a unique booking number
module.exports =  generateBookingNumber = () => {
  const prefix = "TS";
  const randomNumber = Math.floor(Math.random() * 1000000); 
  return `${prefix}${randomNumber}`;
};
