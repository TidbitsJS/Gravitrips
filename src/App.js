import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Grid from "./components/Grid";
import Welcome from "./components/Welcome";
import store from "./Redux/Store";
import "./Styles/game.css";

import "./App.css";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/game">
            <Grid />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
