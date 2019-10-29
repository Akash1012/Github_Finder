import React from "react";
import ReposItem from "./ReposItem";

const Repos = props => {
  const { repos } = props;
  return repos.map(repo => <ReposItem repo={repo} key={repo.id} />);
};

export default Repos;
