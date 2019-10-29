import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../Layout/Spinner";
import githubContext from "../../Context/github/githubContext";

const Users = () => {
  const data = useContext(githubContext);
  const { loading, users } = data;
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} data={user} />
        ))}
      </div>
    );
  }
};

// Adding CSS
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem"
};

export default Users;
