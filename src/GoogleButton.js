import React from "react";
import * as AWS from "aws-sdk/global";
import GoogleLogin from "react-google-login";

import { googleAppClientId, region } from "../config";
import { IDENTITY_POOL_ID } from "./api/aws/aws_profile";

import "./styles/GoogleButton.css";

export default class GoogleButton extends React.Component {
  handleGoogleResponse = async r => {
    if (r.accessToken) {
      // Add google access token to Cognito credentials login map
      AWS.config.region = region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
        Logins: {
          "accounts.google.com": r.tokenId
        }
      });

      // Get credentials
      AWS.config.credentials.get(err => {
        if (err) console.log(err);
        else console.log(AWS.config.credentials.identityId);
      });
    } else {
      console.log("Error with google sign in", r);
    }
  };

  render() {
    return (
      <div id="googleLoginContainer">
        <GoogleLogin
          style={{ lineHeight: "0px", height: "auto" }}
          clientId={googleAppClientId}
          onSuccess={this.handleGoogleResponse}
          onFailure={this.handleGoogleResponse}
        />
      </div>
    );
  }
}
