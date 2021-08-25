import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { RootState } from "../state/reducers";
import HomePage from "./HomePage";

const Results = () => {
  const dispatch = useDispatch();
  const { newRestResult } = bindActionCreators(actionCreators, dispatch);
  const currentUserID: any = useSelector<RootState>((state) => state.store);

  // when page loads, makes get request to server for most liked restaurant & saves in store
  useEffect(() => {
    fetch('/mostLiked')
      .then(res => res.json())
      .then(data => newRestResult(data))
      .catch((err) => console.log('this is err', err));
  })

  const routeHome = () => {
    return (
      <Router>
        <Switch>
          <Route path={`/home/${currentUserID.userID}`}>
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    );
  };

  return (
    <div>
      <div className="header">
        <h2>Chosen Restaurant:</h2>
        <div className="restaurantResult">
            <img src=""></img>
        </div>
      </div>
      <button onClick={routeHome}>Home</button>
    </div>
  );
};

export default Results;
