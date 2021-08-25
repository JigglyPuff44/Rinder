import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, NavLink, useHistory, Route, Switch, Redirect } from 'react-router-dom';

// page needs text with user name at the top
// div with create room button and location input text box
// div with join room button and roomId input text box
const HomePage = () => {
  const [location, setLocation] = useState('');
  const [roomId, setRoomId] = useState('');
  const [missingInfo, setmissingInfo] = useState(false);
  const [wrongInfo, setwrongInfo] = useState(false);

  const dispatch = useDispatch();
  // const updateSession = () => dispatch(actions.updateSession());
  // const updateUser = (userInfo) => dispatch(actions.updateUser(userInfo));

  interface IProps {
    handleSearchTyping(event: React.FormEvent): void;
  }
  const handleLocationSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    const locationBody = {location};
    // checks if user has entered a location
    if (!locationBody) {
      // if not give error message
        setmissingInfo(true);
    } else {
        // location to server
        fetch('/login')
        .then((res) => {
            // if the location doesn't exist
            if (!res) {
                // send error message
                setwrongInfo(true);
            } else {
              const roomId = Math.round(Math.random() * 9999);
              <Redirect to={{
                pathname: "/waiting" + roomId // need to grab from store 
              }}/>
            }
        })
        .catch(err => console.log('this is err', err));
    }
  }
  // handler for when user clicks the Join Room button
  const handleRoomIdSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    const roomIdBody = {roomId};
    // checks if user has entered a room id number
    if (!roomIdBody) {
        // if not give error message
        setmissingInfo(true);
    } else {
        // sends username and password to server 
        fetch('/login')
        .then((res) => {
          // if there is no room with that Id
          if (!res) {
            // give error message
            setwrongInfo(true);
          } else {
          // otherwise redirect user to waiting room
          <Redirect to= {{
            pathname: "/waiting" + roomId
          }}/>
        }
      })
        .catch(err => console.log('this is err', err));
    }
  }
  return (
    <div className="homePage">
      <h1>Welcome to Rinder </h1>
      <form onSubmit={handleLocationSubmit}> 
        <label>
          <p>Enter Location</p>
          <input type="text" name="locationText" onChange={event => setLocation(event.target.value)}/>
        </label>
        <div className="locationButton">
          <button type="submit">Create Room</button>
        </div>
        {missingInfo ? <div>Please enter a location</div>:null}
        {wrongInfo ? <div>Please enter an accurate location</div>:null}
      </form>
      <form onSubmit={handleRoomIdSubmit}> 
        <label>
          <p>Enter the Room ID number</p>
          <input type="text" name="roomIdText" onChange={event => setRoomId(event.target.value)}/>
        </label>
        <div className="joinRoomButton">
          <button type="submit">Join Room</button>
        </div>
        {missingInfo ? <div>Please input a Room ID number</div>:null}
        {wrongInfo ? <div>Please enter an accurate Room ID Number</div>:null}
      </form>
    </div>
  )
}

export default HomePage
