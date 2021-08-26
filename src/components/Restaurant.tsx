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


const Restaurant = () => {
  const dispatch = useDispatch();
  const { newRoomID, newRestList } = bindActionCreators(actionCreators, dispatch);
  const currentRoomID: any = useSelector<RootState>((state) => state.store);
  const currentRestList: any = useSelector<RootState>((state) => state.store);

  return (
    <div>
      <h2>Current Restaurant Name: {currentRestList.name}</h2>
      <img src={`${currentRestList.photo}`}/>
      <label>Rating: {currentRestList.rating}/5</label>
    </div>
  )
}

export default Restaurant;
