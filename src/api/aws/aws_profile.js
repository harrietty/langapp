import { CognitoUserPool } from "amazon-cognito-identity-js";

// TODO: Do we need this? for sync?
//import "amazon-cognito-js";

const REGION = "eu-west-1";
const USER_POOL_ID = "eu-west-1_f482mDdfq";
const CLIENT_ID = "2oqmnv8m4mmh1hag8usnhmcesu";

const userData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
};

export const userPool = new CognitoUserPool(userData);
export const USERPOOL_ID =
  "cognito-idp." + REGION + ".amazonaws.com/" + USER_POOL_ID;
export const IDENTITY_POOL_ID =
  "eu-west-1:a7d84bbe-af4f-45d5-a9c5-acab33d18269";
