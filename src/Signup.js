import React from "react";
import { createUser } from "./api/aws/users_api";

class Signup extends React.Component {
  state = {
    username: "harrietty",
    email: "harriethryder@gmail.com",
    password: "foo"
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
      console.log({ cognitoUser });
    } catch (e) {
      console.log({ e });
    }
  };
  render() {
    return (
      <div>
        <h1>Sign up</h1>
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
    );
  }
}

export default Signup;
