import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import RegistrationForm from "./registration/RegistrationForm";

import { Provider } from 'react-redux';
import store from '../store';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <div className="container">
            <RegistrationForm />
          </div>
        </Fragment>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
