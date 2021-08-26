import React from "react";
import ReactDOM from "react-dom";
import Login from "./login";
import SignUp from "./components/SignupPage";
import WaitingRoom from "./components/WaitingRoom";
import Results from "./components/Results";
import HomePage from "./components/HomePage";
import RestaurantFinder from "./components/RestaurantFinder";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./state";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signUp/">
          <SignUp />
        </Route>
        <Route path="/home/">
          <HomePage />
        </Route>
        <Route path="/waiting/">
          <WaitingRoom />
        </Route>
        <Route path="/restaurantFinder/">
          <RestaurantFinder />
        </Route>
        <Route path="/results/">
          <Results />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app")
);
