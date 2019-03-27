import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "./api/aws/users_api";
import { signIn } from "./redux/auth";

import { Container, WhiteButton, Error, Input } from "./styles/common";

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

  handleSubmit = async e => {
    e.preventDefault();
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
      <Container>
        <div className="row">
          <div className="twelve columns">
            <h3>Sign up</h3>
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <label htmlFor="usernameInput">Username:</label>
                <Input
                  type="text"
                  id="usernameInput"
                  value={this.state.username}
                  onChange={this.handleChange.bind(this, "username")}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="emailInput">Email:</label>
                <Input
                  type="email"
                  id="emailInput"
                  value={this.state.email}
                  onChange={this.handleChange.bind(this, "email")}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="passwordInput">Password:</label>
                <Input
                  type="password"
                  id="passwordInput"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this, "password")}
                />
              </fieldset>
              <WhiteButton type="submit">Sign up</WhiteButton>
            </form>
          </div>
          <div>
            {this.state.validationMessage && (
              <Error>{this.state.validationMessage}</Error>
            )}
          </div>
          <Link to="/">(back)</Link>
        </div>
      </Container>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired
  };
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
