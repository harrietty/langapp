import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <h1>You are not signed in</h1>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };
}

export default Landing;
