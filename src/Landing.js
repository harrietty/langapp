import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, WhiteButton } from "./styles/common";

class Landing extends React.Component {
  render() {
    return (
      <Container>
        <h1>Welcome to holahi!</h1>
        <div>
          <Link to="/signin">
            <WhiteButton>Sign In</WhiteButton>
          </Link>
          <Link to="/signup">
            <WhiteButton>Sign Up</WhiteButton>
          </Link>
        </div>
      </Container>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };
}

export default Landing;
