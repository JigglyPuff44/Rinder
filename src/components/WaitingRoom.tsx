import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { RootState } from "../state/reducers";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const { newUserList } = bindActionCreators(actionCreators, dispatch);
  const { newRestList } = bindActionCreators(actionCreators, dispatch);
  const currentRoomID: any = useSelector<RootState>((state) => state.store);
  const currentUserList: any = useSelector<RootState>((state) => state.store);

  let history = useHistory();

  const fetchUsers = () => {
    fetch("/waiting")
      .then((res) => res.json())
      .then((data) => {
        newUserList(data);
      })
      .catch((err) => console.log("this is err", err));
  };
  setInterval(() => {
    fetchUsers;
  }, 1000);

  const fetchRestaurants = () => {
    fetch("/restaurants")
      .then((res) => res.json())
      .then((data) => {
        newRestList(data);
      })
      .catch((err) => console.log("this is err", err));
    return history.push(`/restaurantFinder/${currentRoomID.roomID}`);
  };

  const individualUser: [] = [];
  for (let i = 0; i < currentUserList.userList.length; i += 1) {
    <h2>currentUserList.userList[i]</h2>;
  }

  return (
    <div>
      <div className="header">
        <h2>Waiting Room</h2>
        <h2>Room ID: {currentRoomID.roomID}</h2>
        <hr></hr>
        <h2>Currently in the Room</h2>
      </div>
      <div className="userList">{individualUser};</div>
      <button onClick={fetchRestaurants}>Start Restaurant Search</button>
    </div>
  );
};

export default WaitingRoom;
