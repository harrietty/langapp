import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signOut } from "./api/aws/users_api";
import * as auth from "./redux/auth";

class Home extends React.Component {
  signOut = () => {
    try {
      signOut();
      this.props.signOut();
    } catch (e) {
      if (e.message !== "No user is currently signed in") {
        throw e;
      }
    }
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>The home component</h1>
        <button onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(auth.signOut())
});

export default connect(
  null,
  mapDispatchToProps
)(Home);
