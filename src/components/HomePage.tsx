import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, NavLink, useHistory, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import WaitingRoom from './WaitingRoom';


// page needs text with user name at the top
// div with create room button and location input text box
// div with join room button and roomId input text box
const HomePage = () => {
  const [location, setLocation] = useState('');
  const [roomID, setRoomID] = useState('');
  const [missingInfo, setMissingInfo] = useState(false);
  const [wrongInfo, setWrongInfo] = useState(false);

  const dispatch = useDispatch();
  const { newRoomID } = bindActionCreators(actionCreators, dispatch)

  const handleLocationSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    const locationBody = {location};
    // checks if user has entered a location
    if (!locationBody) {
      // if not give error message
        setMissingInfo(true);
    } else {
        console.log('location was entered')
        // invoke api call file
        
        // get request to api
        fetch('/waiting')
        .then((response) => response.json())
        .then((res) => {
            // if the location doesn't exist
            if (!res) {
                // send error message
                setWrongInfo(true);
            } else {
              newRoomID(res);
              return (
                <Router>
                  <Switch>
                    <Route path={`/waiting/${roomID}`}>
                      <WaitingRoom />
                    </Route>
                  </Switch>
                </Router>
              )}
        })
        .catch(err => console.log('this is err', err));
    }
  }
  // handler for when user clicks the Join Room button
  const handleRoomIDSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    const roomIDBody = {roomID};
    // checks if user has entered a room id number
    if (!roomIDBody) {
        // if not give error message
        setMissingInfo(true);
    } else {
        // sends username and password to server 
        fetch('/login', {
          method: 'POST',
          mode: 'cors', 
          headers: {
          'Content-Type': 'application/json'              
          },
          body: JSON.stringify(roomIDBody)
        })
        .then((response) => response.json())
        .then((res) => {
          // if there is no room with that Id
          if (!res) {
            // give error message
            setWrongInfo(true);
          } else {
          return (
            <Router>
              <Switch>
                <Route path={`/waiting/${roomID}`}>
                  <WaitingRoom />
                </Route>
              </Switch>
            </Router>
          )}
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
      <form onSubmit={handleRoomIDSubmit}> 
        <label>
          <p>Enter the Room ID number</p>
          <input type="text" name="roomIDText" onChange={event => setRoomID(event.target.value)}/>
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
