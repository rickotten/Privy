import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import RegistrationForm from "./registration/RegistrationForm";
import LoginForm from "./login/LoginForm";
import User from "./user/User";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={User} />
                <Route exact path="/register" component={RegistrationForm} />
                <Route exact path="/login" component={LoginForm} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
