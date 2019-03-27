import { authReducer, signIn, signOut } from "../../src/redux/auth";

describe("authReducer", () => {
  const cognitoUser = {
    username: "harriet",
    userDataKey: "12345",
    Session: null,
    keyPrefix: "123",
    authenticationFlowType: "USER_SRP_AUTH"
  };
  describe("when passed no action", () => {
    test("returns the initial state", () => {
      expect(authReducer()).toEqual({
        isSignedIn: false,
        cognitoUser: null
      });
    });
  });

  describe("when passed SIGN_IN action", () => {
    test("updates state", () => {
      const initial = {
        isSignedIn: false,
        cognitoUser: null
      };
      const action = signIn(cognitoUser);
      expect(authReducer(initial, action)).toEqual({
        isSignedIn: true,
        cognitoUser
      });
    });
  });

  describe("when passed SIGN_OUT action", () => {
    test("updates state", () => {
      const initial = {
        isSignedIn: true,
        cognitoUser
      };
      const action = signOut();
      expect(authReducer(initial, action)).toEqual({
        isSignedIn: false,
        cognitoUser: null
      });
    });
  });
});
