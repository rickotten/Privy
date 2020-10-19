import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

import Alerts from './layout/Alerts';
import RegistrationForm from "./registration/RegistrationForm";
import LoginForm from "./login/LoginForm";
// import User from "./user/User";
import PrivateRoute from "./common/PrivateRoute";
import ForgotCredentialsForm from "./login/ForgotCredentialsForm";
import HomePage from "./layout/HomePage";

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import { get_user_posts } from "../actions/posts";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route exact path="/register" component={RegistrationForm} />
                  <Route exact path="/login" component={LoginForm} />
                  <Route exact path="/forgot" component={ForgotCredentialsForm} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
