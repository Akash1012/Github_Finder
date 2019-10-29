import React,{useContext} from "react";
import alertContext from '../../Context/alert/AlertContext';

const Alert = () => {
  const data = useContext(alertContext)
  const {alert} = data
  return (
    alert !== null && (
      <div style={popup}>
        &nbsp; <i className="fas fa-info-circle" /> {alert.message}
      </div>
    )
  );
};

const popup = {
  background: "gray",
  borderRadius: "5px"
};

export default Alert;
