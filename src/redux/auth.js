const state = {
  isSignedIn: false,
  cognitoUser: null
};

const SIGN_IN = "SIGN_IN";

// ACTIONS
export const signInUser = cognitoUser => ({
  type: SIGN_IN,
  payload: cognitoUser
});

export const authReducer = (initialState = state, action) => {
  if (!action) return initialState;
  const newState = Object.assign({}, initialState);

  if (action.type === SIGN_IN) {
    newState.isSignedIn = true;
    newState.cognitoUser = action.payload;
  }

  return newState;
};
