import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.history.push("/home");
    }
  }
  render() {
    return (
      <div>
        <h1>You are not signed in</h1>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
}

const mapStateToProps = auth => ({
  isSignedIn: auth.isSignedIn
});

export default connect(mapStateToProps)(Landing);
