import React, { useReducer, useEffect } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";

import {
  SEARCH_USERS,
  GET_USER,
  SET_LOADING,
  CLEAR_USER,
  GET_REPOS,
  ALL_USERS,
  HOME
} from "../types";

var REACT_APP_GITHUB_CLIENT_ID = "5b1f4a1863e34687b4da";
var REACT_APP_GITHUB_CLIENT_SECRET = "bee403f3b7fe522a8a5f3bda7e11d3cd3d378654";

const GithubState = props => {
  const initialState = {
    users: [],
    singleUser: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Home User
  useEffect(() => {
    setLoding();
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({
        type: ALL_USERS,
        payload: res.data
      });
    };
    fetchData();
  }, []);
  // Home BUtton
  const comehome = async () => {
    setLoding();
    const res = await axios.get(
      `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: HOME,
      payload: res.data
    });
  };
  // Search Users
  const searchUsers = async text => {
    setLoding();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };
  // Get User
  const getUser = async username => {
    setLoding();
    const res = await axios.get(
      `https://api.github.com/users/${username}?&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //Get Repos
  const getUserRepos = async username => {
    setLoding();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  //Clear Users
  const clearUsers = () => {
    setLoding();
    dispatch({
      type: CLEAR_USER
    });
  };

  //Set Loading
  const setLoding = () => dispatch({ type: SET_LOADING });

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        singleUser: state.singleUser,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        comehome,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
