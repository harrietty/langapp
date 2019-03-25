import qs from "querystring";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { confirmUser } from "./api/aws/users_api";

class ConfirmEmail extends React.Component {
  state = {
    code: "",
    confirmError: null
  };
  componentDidMount() {
    if (!this.props.location.search) {
      this.props.history.push("/");
    }
  }
  handleSubmit = async e => {
    e.preventDefault();
    const { username } = qs.parse(this.props.location.search.slice(1));
    try {
      await confirmUser(username, this.state.code);
      this.props.history.push("/signin?confirm_email_success=true");
    } catch (e) {
      if (e.code === "CodeMismatchException") {
        this.setState({
          confirmError: e.message
        });
      } else if (e.code === "NotAuthorizedException") {
        // Email already confirmed, so send to Sign In
        this.props.history.push("/signin?confirm_email_success=true");
      }
    }
  };

  handleChange = e => {
    this.setState({
      code: e.target.value
    });
  };
  render() {
    return (
      <div>
        <h1>The ConfirmEmail component</h1>
        <h3>You should have received an email with your confirmation code.</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Confirmation Code</label>
          <input
            type="text"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <button type="submit">Confirm</button>
          {this.state.confirmError && <p>{this.state.confirmError}</p>}
        </form>
      </div>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };
}

const mapStateToProps = auth => ({
  cognitoUser: auth.cognitoUser || {}
});

export default connect(mapStateToProps)(ConfirmEmail);
