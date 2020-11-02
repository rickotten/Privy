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
import UserTimeline from "./layout/UserTimeline"
import UserPostForm from "./posts/UserPostForm"
import User from "./user/User"
import Logout from "./user/Logout"

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import UserProfile from "./user/UserProfile";
import ArbitraryUserProfile from "./user/ArbitraryUserProfile"
import './myStyles.css';

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
                  <PrivateRoute exact path="/profile/:username" component={ArbitraryUserProfile} />
                  <PrivateRoute exact path="/profile" component={UserProfile} />
                  <Route exact path="/register" component={RegistrationForm} />
                  <Route exact path="/login" component={LoginForm} />
                  <PrivateRoute exact path="/forgot" component={ForgotCredentialsForm} />
                  <Route exact path="/users/:username" component={UserTimeline} />
                  <PrivateRoute exact path="/createpost" component={UserPostForm} />
                  <PrivateRoute exact path="/addfriend" component={User} />
                  <PrivateRoute exact path="/logout" component={Logout} />
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
