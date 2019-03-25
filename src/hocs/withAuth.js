import React from "react";
import PropTypes from "prop-types";
import { retrieveUserFromLocalStorage } from "../api/aws/users_api";
import { connect } from "react-redux";

export default function withAuth(WrappedComponent) {
  class AuthenticatedComponent extends React.Component {
    componentDidMount = async () => {
      if (!this.props.isSignedIn) {
        try {
          const user = await retrieveUserFromLocalStorage();
          if (!user) {
            this.props.history.push("/");
          }
        } catch (e) {
          if (e.message === "Failed to retrieve user from localStorage") {
            this.props.history.push("/");
          } else {
            throw e;
          }
        }
      }
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }

    static propTypes = {
      history: PropTypes.object.isRequired,
      isSignedIn: PropTypes.bool.isRequired
    };
  }

  const mapStateToProps = ({ auth }) => ({
    isSignedIn: auth.isSignedIn
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
