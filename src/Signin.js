import qs from "querystring";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signIn } from "./api/aws/users_api";
import * as auth from "./redux/auth";

class Signin extends React.Component {
  state = {
    username: "harrietty",
    password: ""
  };
  handleChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    });
  };

  signIn = async () => {
    try {
      const cognitoUser = await signIn(
        this.state.username,
        this.state.password
      );
      this.props.signIn(cognitoUser);
      console.log(cognitoUser);
      this.props.history.push("/home");
    } catch (e) {
      if (e.code === "UserNotConfirmedException") {
        this.props.history.push(`/confirm?username=${this.state.username}`);
      } else {
        console.log("error after sign in", e);
        throw e;
      }
    }
  };
  render() {
    const emailConfirmed = qs.parse(this.props.location.search.slice(1))
      .confirm_email_success;
    return (
      <div>
        <h1>Sign In</h1>
        {emailConfirmed ? (
          <h5>Your email address has been confirmed. Please sign in again.</h5>
        ) : null}
        <div>
          <label>Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange.bind(this, "username")}
          />
          <label>Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, "password")}
          />
          <button onClick={this.signIn}>Sign in</button>
        </div>
      </div>
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
