import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = props => {
  const { login, avatar_url } = props.data;
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt="Loading.."
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <Link to={`SingleUser/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
};
UserItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default UserItem;
