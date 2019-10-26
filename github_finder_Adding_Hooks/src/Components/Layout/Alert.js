import React from "react";

const Alert = ({ setAlert }) => {
  return (
    setAlert !== null && (
      <div style={popup}>
        &nbsp; <i className="fas fa-info-circle" /> {setAlert.message}
      </div>
    )
  );
};

const popup = {
  background: "gray",
  borderRadius: "5px"
};

export default Alert;
