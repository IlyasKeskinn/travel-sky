// Function to validate email format
module.exports = function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
  return emailRegex.test(email); // Test the email against the regex
};
