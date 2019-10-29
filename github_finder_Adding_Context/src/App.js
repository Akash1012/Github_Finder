import React from "react";
import "./App.css";
import NavBar from "./Components/Layout/NavBar";
import Alert from "./Components/Layout/Alert";
import About from "./Components/Pages/About";
import NotFound from "./Components/Pages/NotFound";
import SingleUser from "./Components/Users/SingleUser";
import GithubState from "./Context/github/GithubState";
import AlertState from "./Context/alert/AlertState";
import Home from "./Components/Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <NavBar title="Github Finder" icon="fab fa-github" />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/SingleUser/:login" component={SingleUser} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
