const state = {
  isSignedIn: false,
  cognitoUser: null
};

const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

// ACTIONS
export const signIn = cognitoUser => ({
  type: SIGN_IN,
  payload: cognitoUser
});

export const signOut = () => ({
  type: SIGN_OUT
});

export const authReducer = (initialState = state, action) => {
  if (!action) return initialState;
  const newState = Object.assign({}, initialState);

  if (action.type === SIGN_IN) {
    newState.isSignedIn = true;
    newState.cognitoUser = action.payload;
  }

  if (action.type === SIGN_OUT) {
    newState.isSignedIn = false;
    newState.cognitoUser = null;
  }

  return newState;
};
