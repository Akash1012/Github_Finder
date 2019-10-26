import React, { Fragment } from "react";
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

class App extends React.Component {
  state = {
    users: [],
    loading: false,
    singleUser: {},
    alert: null,
    repos: []
  };
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }
  // Search User
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };
  // Clear Users from State
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Home
  comehome = async () => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  };
  // Set Alert
  setAlert = (message, type) => {
    this.setState({ alert: { message: message, color: type } });
    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 2000);
  };

  // Get Single Github Users

  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log("Get Repo", res.data);
    this.setState({ singleUser: res.data, loading: false });
  };

  // Get User repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&clinet_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);
    this.setState({ repos: res.data, loading: false });
  };
  render() {
    const { users, singleUser, repos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar
            title="Github Finder"
            icon="fab fa-github"
            home={this.comehome}
          />
          <div className="container">
            <Alert setAlert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    user={singleUser}
                    getUserRepos={this.getUserRepos}
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
  }
}

export default App;
