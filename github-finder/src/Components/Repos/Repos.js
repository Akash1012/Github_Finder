import React from "react";
import PropTypes from "prop-types";
import ReposItem from "./ReposItem";

const Repos = props => {
  const { repos } = props;
  return repos.map(repo => <ReposItem repo={repo} key={repo.id} />);
};
Repos.PropTypes = {
  repos: PropTypes.array.isRequired
};

export default Repos;
