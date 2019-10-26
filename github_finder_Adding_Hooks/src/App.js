import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import NavBar from "./Components/Layout/NavBar";
import Users from "./Components/Users/Users";
import Search from "./Components/Users/Search";
import Alert from "./Components/Layout/Alert";
import About from "./Components/Pages/About";
import SingleUser from "./Components/Users/SingleUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
// ENV
var REACT_APP_GITHUB_CLIENT_ID = "5b1f4a1863e34687b4da";
var REACT_APP_GITHUB_CLIENT_SECRET = "bee403f3b7fe522a8a5f3bda7e11d3cd3d378654";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoding] = useState(false);
  const [singleUser, setsingleUser] = useState({});
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setLoding(true);
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data);
      setLoding(false);
    };
    fetchData();
  }, []);

  //------------------
  //  useEffect (() => {
  //    console.log("Hello");
  //   setLoding(true);
  //   const res =  axios.get(
  //     `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   console.log
  //   setUsers(res.data);
  //   setLoding(false);
  // },[])

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  // }
  // Search User
  const searchUsers = async text => {
    setLoding(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoding(false);
  };
  // Clear Users from State
  const clearUsers = () => {
    setUsers([]);
    setLoding(false);
  };

  // Home
  const comehome = async () => {
    setLoding(true);
    const res = await axios.get(
      `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data);
    setLoding(false);
  };
  // Set Alert
  const showAlert = (message, type) => {
    setAlert({ message, type });
    //this.setState({ alert: { message: message, color: type } });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  // Get Single Github Users

  const getUser = async username => {
    setLoding(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setsingleUser(res.data);
    setLoding(false);
  };

  // Get User repos
  const getUserRepos = async username => {
    setLoding(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoding(false);
  };
  //const { users, singleUser, repos, loading } = this.state;
  return (
    <Router>
      <div className="App">
        <NavBar title="Github Finder" icon="fab fa-github" home={comehome} />
        <div className="container">
          <Alert setAlert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/SingleUser/:login"
              render={props => (
                <SingleUser
                  {...props}
                  getUser={getUser}
                  user={singleUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
