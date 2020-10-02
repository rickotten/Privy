import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import RegistrationForm from "./registration/RegistrationForm";
import User from "./user/User";

import { Provider } from 'react-redux';
import store from '../store';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className="container">
              <Switch>
                <Route exact path="/" component={RegistrationForm} />
                <Route exact path="/user" component={User} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
