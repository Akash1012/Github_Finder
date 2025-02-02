import React from "react";
import PropTypes from "prop-types";

class Search extends React.Component {
  state = {
    text: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please Enter Something ...", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };
  render() {
    const { showClear, clearUsers } = this.props;
    console.log(showClear);
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users ...."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear ? (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        ) : null}
      </div>
    );
  }
}
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};
export default Search;
