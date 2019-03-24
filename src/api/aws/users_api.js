import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { userPool } from "./aws_profile";

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
