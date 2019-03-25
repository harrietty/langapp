import React from "react";
import { createUser } from "./api/aws/users_api";
import { connect } from "react-redux";

import { signIn } from "./redux/auth";

class Signup extends React.Component {
  state = {
    username: "harrietty",
    email: "harriethryder@gmail.com",
    password: "",
    validationMessage: null
  };

  handleChange = (key, e) => {
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  };

  signUp = async () => {
    try {
      const { cognitoUser } = await createUser(
        this.state.username,
        this.state.password,
        this.state.email
      );
      this.props.signIn(cognitoUser);
      this.props.history.push("/confirm");
    } catch (e) {
      if (e.message) {
        this.setState({
          validationMessage: e.message
        });
      } else {
        throw e;
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange.bind(this, "username")}
          />
          <label>Email:</label>
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleChange.bind(this, "email")}
          />
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, "password")}
          />
          <button onClick={this.signUp}>Sign up</button>
        </div>
        <div>
          {this.state.validationMessage && (
            <p>{this.state.validationMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: cognitoUser => {
    dispatch(signIn(cognitoUser));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);
