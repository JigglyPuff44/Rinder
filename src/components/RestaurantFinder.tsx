import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { RootState } from "../state/reducers";
import Results from "./Results";

const RestaurantFinder = () => {
  const dispatch = useDispatch();
  const store: any = useSelector<RootState>((state) => state.store);
  const [index, setIndex] = useState(0);

  let history = useHistory();

  const handleSwipeNo = () => {
    if (index < 11) {
      setIndex(index + 1);
    } else if (index === 10) {
      return history.push(`/result/${store.roomID}`);
    }
  };

  const handleSwipeYes = () => {
    // increment this pictures likeTotal by 1
    // go to the next restaurant in the list
    fetch("/restaurantFinder/yes", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store.restList[index].restaurantID), //from database primary key
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log("err in post request in front end", err);
      });
    if (index < 11) {
      setIndex(index + 1);
    } else if (index === 10) {
      return history.push(`/result/${store.roomID}`);
    }
  };

  // create image linked to api
  return (
    <div>
      <div className="header">
        <h2>Room ID Number: {store.roomID}</h2>
      </div>
      <hr></hr>
      <div className="individualRest">
        <h1>{store.restList[index].name}</h1>
        <img src={store.restList[index].photo} />
        <h2>Rating: {store.restList[index].rating}/5</h2>
        <h2>Address: {store.restList[index].address}</h2>
      </div>
      <div className="swipeLeftButton">
        <button onClick={handleSwipeNo}>Eww</button>
      </div>
      <div className="swipeRightButton">
        <button onClick={handleSwipeYes}>Yum</button>
      </div>
    </div>
  );
};

export default RestaurantFinder;
