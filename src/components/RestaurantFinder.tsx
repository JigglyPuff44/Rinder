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
import Restaurant from "./Restaurant";
import Resaurant from './Restaurant';


const RestaurantFinder = () => {
  const dispatch = useDispatch();
  const { newRestList } = bindActionCreators(actionCreators, dispatch);
  const currentRoomID: any = useSelector<RootState>((state) => state.store);
  const currentRestList: any = useSelector<RootState>((state) => state.store);

  const handleSwipeLeft = (event: React.FormEvent) => {
    event.preventDefault();
    // increment this pictures likeTotal by 1
    // go to the next restaurant in the list
    fetch("/restaurantFinder/left", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .catch((err) => {
      console.log("err in post request in front end", err);
    })
  }

  const handleSwipeRight = (event: React.FormEvent) => {
    event.preventDefault();
    // increment this pictures likeTotal by 1
    // go to the next restaurant in the list
    fetch("/restaurantFinder/right", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then()
    .catch((err) => {
      console.log("err in post request in front end", err);
    })
  }
  for(let i = 0; i < 11; i += 1) {
    <Restaurant key={i}></Restaurant>
  }
  // create image linked to api
  return (
    <div>
      <div className="header">
        <h1>Room ID Number: {currentRoomID.roomID}</h1>
        <hr></hr>
      </div>
      <div className="swipeLeftButton">
        <button onClick={handleSwipeLeft}>Eww</button>
      </div>
      <div className="swipeRightButton">
        <button onClick={handleSwipeRight}>Yum</button>
      </div>
    </div>
  )
}

export default RestaurantFinder
