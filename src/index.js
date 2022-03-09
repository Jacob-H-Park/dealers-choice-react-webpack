import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      wines: [],
    };
    this.create = this.create.bind(this);
    this.removeWine = this.removeWine.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get("/api/wines");
    this.setState({ wines: data });
  }

  async create() {
    const { data } = await axios.post("/api/wines");
    const winesUpdated = [...this.state.wines, data];
    this.setState({ wines: winesUpdated });
  }

  async removeWine(wine) {
    await axios.delete(`/api/wines/${wine.id}`);
    const winesNotDeleted = this.state.wines.filter(
      (_wine) => _wine.id !== wine.id
    );
    this.setState({ wines: winesNotDeleted });
  }

  render() {
    const wines = this.state.wines;
    return (
      <div>
        <button className="button" onClick={this.create}>
          Create
        </button>
        <div>
          {wines.map((wine) => {
            return (
              <div key={wine.id}>
                {wine.id}. {wine.name} - {wine.type}
                <button
                  className="deleteButton"
                  onClick={() => this.removeWine(wine)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

render(<App />, document.querySelector("#root"));
