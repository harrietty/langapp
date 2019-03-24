import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import Signin from "./Signin";
import Signup from "./Signup";
import Landing from "./Landing";
import Home from "./Home";

import { authReducer } from "./redux/auth";

const store = createStore(
  combineReducers({
    auth: authReducer
  })
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        props.isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function AuthApp() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/home" component={Home} />
        </div>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<AuthApp />, document.getElementById("root"));
