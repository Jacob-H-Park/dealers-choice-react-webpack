import { React, Component } from "react";
import { ReactDOM, render } from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      wines: [],
    };
  }

  render() {
    const wines = this.state.wines;
    return <div>hello</div>;
  }
}

render(<App />, document.querySelector("#root"));
