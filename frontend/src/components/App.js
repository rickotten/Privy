import React, { Component } from "react";
import ReactDOM from "react-dom";

export class App extends Component {
  render() {
    return <h1>Hello world!</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
