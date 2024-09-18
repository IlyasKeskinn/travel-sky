const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "2px solid #50D890" : "2px solid #cbd1db",
    boxShadow: state.isFocused ? "0 0 5px rgba(80, 216, 144, 0.8)" : "none",
    padding: "12px 12px",
    "&:hover": {
      borderColor: "#50D890",
    },
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#50D890"
      : state.isFocused
      ? "#e0ffe8"
      : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    padding: 10,
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
    cursor: "pointer",
  }),
};

export default customSelectStyles;
