import React, { useReducer } from "react";
import alertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = null;
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const SetAlert = (message, type) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        message,
        type
      }
    });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state,
        SetAlert
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
