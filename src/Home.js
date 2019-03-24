import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>The home component</h1>
      </div>
    );
  }
}

const mapStateToProps = auth => ({
  isSignedIn: auth.isSignedIn
});

export default connect(mapStateToProps)(Home);
