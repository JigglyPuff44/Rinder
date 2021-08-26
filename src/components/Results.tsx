import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { RootState } from "../state/reducers";
import HomePage from "./HomePage";

const Results = () => {
  const dispatch = useDispatch();
  const { newRestResult } = bindActionCreators(actionCreators, dispatch);
  const store: any = useSelector<RootState>((state) => state.store);

  let history = useHistory();
  // when page loads, makes get request to server for most liked restaurant & saves in store
  useEffect(() => {
    fetch("/mostLiked")
      .then((res) => res.json())
      .then((data) => newRestResult(data))
      .catch((err) => console.log("this is err", err));
  });
  // when home button is clicked, redirects to homepage
  const routeHome = () => {
    return history.push(`/home/${store.user_id}`);
  };
  return (
    <div>
      <div className="header">
        <h2>Chosen Restaurant:</h2>
        <div className="restaurantResult">
          <h1>{store.restResult.name}</h1>
          <img src={store.restResult.photo} />
          <h2>Rating: {store.restResult.rating}/5</h2>
          <h2>Address: {store.restResult.address}</h2>
        </div>
      </div>
      <button onClick={routeHome}>Home</button>
    </div>
  );
};

export default Results;
