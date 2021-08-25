import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  NavLink,
  useHistory,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { RootState } from "../state/reducers";


const RestaurantFinder = () => {
  const dispatch = useDispatch();
  const { newRestList } = bindActionCreators(actionCreators, dispatch);
  const currentRoomID: any = useSelector<RootState>((state) => state.store);
  const currentRestList: any = useSelector<RootState>((state) => state.store);

  const fetchRestaurants = () => {
    fetch("/restaurantFinder")
    .then((res) => res.json())
    .then((data) => {
      newRestList(data);
    })
    .catch((err) => console.log("this is the err", err));
  }
  // create image linked to api
  // create 2 buttons for upvoting and downvoting
  // create an h1 tag with the room id number
  // create an h2 tag with the restaurant name
  // create label for rating(hopefully changed to stars/icons later)
  return (
    <div>
      <h1>Room ID Number: </h1>
      <h2>The Chosen Restaurant is: </h2>
      <div className="swipeLeftButton">
        <button type="submit">Eww</button>
      </div>
      <div className="swipeRightButton">
        <button type="submit">Yum</button>
      </div>
    </div>
  )
}

export default RestaurantFinder
