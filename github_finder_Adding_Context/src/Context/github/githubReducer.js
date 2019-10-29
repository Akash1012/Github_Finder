import {
  SEARCH_USERS,
  GET_USER,
  SET_LOADING,
  CLEAR_USER,
  GET_REPOS,
  ALL_USERS,
  HOME
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case HOME:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        singleUser: action.payload,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
