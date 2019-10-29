import React, { useState, useContext } from "react";
import githubContext from "../../Context/github/githubContext";
import alertContext from "../../Context/alert/AlertContext";

const Search = props => {
  //const { showClear, clearUsers } = props;
  const [text, setText] = useState("");
  const data = useContext(githubContext);
  const dataAlert = useContext(alertContext);
  //const { searchUsers, clearUsers } = data;
  const onChange = e => {
    setText(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      dataAlert.SetAlert("Please Enter Something ...", "light");
    } else {
      data.searchUsers(text);
      setText("");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text" // not needed here
          placeholder="Search Users ...."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {data.users.length > 0 ? (
        <button className="btn btn-light btn-block" onClick={data.clearUsers}>
          Clear
        </button>
      ) : null}
    </div>
  );
};
export default Search;
