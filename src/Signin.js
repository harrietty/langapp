import qs from "querystring";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "./api/aws/users_api";
import * as auth from "./redux/auth";

import { Container, WhiteButton, Error, Input } from "./styles/common";
import GoogleButton from "./GoogleButton";

class Signin extends React.Component {
  state = {
    username: "harrietty",
    password: "",
    signInError: null
  };

  handleChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const cognitoUser = await signIn(
        this.state.username,
        this.state.password
      );
      this.props.signIn(cognitoUser);
      this.props.history.push("/home");
    } catch (e) {
      if (e.code === "UserNotConfirmedException") {
        this.props.history.push(`/confirm?username=${this.state.username}`);
      } else {
        if (e.code === "NotAuthorizedException") {
          this.setState({
            signInError: e.message
          });
        } else {
          throw e;
        }
      }
    }
  };
  render() {
    const emailConfirmed = qs.parse(this.props.location.search.slice(1))
      .confirm_email_success;
    return (
      <Container>
        <h3>Sign In</h3>
        {emailConfirmed ? (
          <h5>Your email address has been confirmed. Please sign in again.</h5>
        ) : null}
        <div>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label>Username</label>
              <Input
                type="text"
                value={this.state.username}
                onChange={this.handleChange.bind(this, "username")}
              />
            </fieldset>

            <fieldset>
              <label>Password</label>
              <Input
                type="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this, "password")}
              />
            </fieldset>
            <WhiteButton type="submit">Sign in</WhiteButton>
          </form>
          {this.state.signInError && <Error>{this.state.signInError}</Error>}
          <GoogleButton />
          <Link to="/">(back)</Link>
        </div>
      </Container>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired
  };
}

const mapDispatchToProps = dispatch => ({
  signIn: cognitoUser => dispatch(auth.signIn(cognitoUser))
});

export default connect(
  null,
  mapDispatchToProps
)(Signin);
