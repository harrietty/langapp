import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import { userPool, IDENTITY_POOL_ID, USERPOOL_ID } from "./aws_profile";
import { region } from "../../../config";

export function createUser(username, password, email) {
  return new Promise((resolve, reject) => {
    const attributeList = [];

    const dataEmail = {
      Name: "email",
      Value: email
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, function(
      err,
      result
    ) {
      if (err) {
        reject(err);
      } else {
        resolve({
          cognitoUser: result.user
        });
      }
    });
  });
}

export function signIn(username, password) {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: password
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPoolData = {
      Username: username,
      Pool: userPool
    };

    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoPoolUser = new CognitoUser(userPoolData);
    const cognitoUser = new CognitoUser(userData);
    cognitoPoolUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        const jwtToken = result.getAccessToken().getJwtToken();
        localStorage.setItem("user_token", jwtToken);
        AWS.config.region = region;

        const loginsObj = {
          [USERPOOL_ID]: result.getIdToken().getJwtToken()
        };
        // Configure AWS with user's credentials
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID,
          Logins: loginsObj
        });

        // Refresh the credentials to use the newly set ones
        AWS.config.credentials.refresh(() => {
          resolve(cognitoUser);
        });
      },
      onFailure: reject
    });
  });
}

export function confirmUser(username, code) {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function signOut() {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) throw new Error("No user is currently signed in");
  else {
    localStorage.removeItem("user_token");
    return cognitoUser.signOut();
  }
}

export function retrieveUserFromLocalStorage() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          reject(err);
        }

        if (session.isValid()) {
          localStorage.setItem(
            "user_token",
            session.getAccessToken().getJwtToken()
          );

          const loginsObj = {
            [USERPOOL_ID]: session.getIdToken().getJwtToken()
          };
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IDENTITY_POOL_ID,
            Logins: loginsObj
          });

          // Refresh the credentials to use the newly set ones
          AWS.config.credentials.refresh(() => {
            resolve(cognitoUser);
          });
        } else {
          reject("Session was not valid");
        }
      });
    } else {
      reject("Failed to retrieve user from localStorage");
    }
  });
}
