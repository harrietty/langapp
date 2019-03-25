import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import Signin from "./Signin";
import Signup from "./Signup";
import Landing from "./Landing";
import ConfirmEmail from "./ConfirmEmail";
import Home from "./Home";
import withAuth from "./hocs/withAuth";

import { authReducer } from "./redux/auth";

const store = createStore(
  combineReducers({
    auth: authReducer
  })
);

function AuthApp() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/confirm" component={ConfirmEmail} />
          <Route exact path="/home" component={withAuth(Home)} />
        </div>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<AuthApp />, document.getElementById("root"));
