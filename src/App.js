import React, { Component } from "react";
import { Provider } from "react-redux";

import "./App.css";
import store from "./store";
import Filter from "./components/filter/Filter";
import Cloth from "./components/cloth/Cloth";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app-container">
          <div className="side-container">
            <Filter />
          </div>

          <div className="content-container">
            <Cloth />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
