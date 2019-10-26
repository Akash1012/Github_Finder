import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  handleClick = () => {
    this.props.home();
  };
  render() {
    const { title, icon } = this.props;
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={icon} /> {title}
        </h1>
        <ul>
          <li>
            <Link to="/" onClick={this.handleClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

// Adding Default Props
NavBar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};
// Type Checking of Props
NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default NavBar;
