import React, { Component } from "react";
import ReactDOM from "react-dom";
import RegistrationForm from "./registration/RegistrationForm";

export class App extends Component {
  render() {
    return (
      <div>
        <RegistrationForm />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
