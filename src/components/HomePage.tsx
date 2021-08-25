import { networkInterfaces } from 'node:os';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  NavLink,
  useHistory,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { RootState } from '../state/reducers';
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
  const { newRoomID, newRestList } = bindActionCreators(
    actionCreators,
    dispatch
  );
  // link to store for restaurant list
  const currentRestList: any = useSelector<RootState>((state) => state.store);
  // link to store for roomID
  const currentRoomID: any = useSelector<RootState>((state) => state.store);

  // post request to server to write into db of restaurant list 
  const sendRestList = () => {
    fetch('/restaurants', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentRestList.restList),
    })
      .catch((err) => console.log('this is err', err));
  }

  // get request to server for generated room id and save to store
  const genRoomID = () => {
    fetch('/roomID')
      .then(res => res.json())
      .then(data => newRoomID(data))
      .catch((err) => console.log('this is err', err));
  }

  const handleLocationSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // const location = { locationBody };
    // checks if user has entered a location
    if (!location) {
      // if not give error message
      setMissingInfo(true);
    } else {
      console.log('location was entered');
      const userLocation = location.replace(' ', '+');
      //fetch request to google api to gather name, rating, address, photo for restaurant
      const google_API = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+${userLocation}+united+states&key=AIzaSyC5NRHs0hj0_DyAwHqoTJ0KcGHx_UOstcI`;
      fetch(google_API)
        .then((res) => res.json())
        .then((data) => {
          const realRestList = [];
          //iterate through the data that was sent back from google api
          for (let i = 0; i < data.results.length; i++) {
            //create an object to store name, rating, address, photo
            const restaurantList: any = {};
            restaurantList.name = data.results.name;
            restaurantList.rating = data.results.rating;
            restaurantList.address = data.results.formatted_address;
            restaurantList.photo = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${data.results.photos[0].photo_reference}&sensor=false&maxheight=500&maxwidth=500&key=AIzaSyC5NRHs0hj0_DyAwHqoTJ0KcGHx_UOstcI`;
            realRestList.push(restaurantList);
            // grabbing only 10 restaurants from list to save
            if (realRestList.length >= 11) break; 
          }
          newRestList(realRestList);
        })
        .then(() => sendRestList())
        .then(() => genRoomID())
        .then(() => {
          return (
            <Router>
              <Switch>
                <Route path={`/waiting/${currentRoomID.roomID}`}>
                  <WaitingRoom />
                </Route>
              </Switch>
            </Router>
          );
        })
        .catch((err) => console.log('this is err', err));
    }
  };
  // handler for when user clicks the Join Room button
  const handleRoomIDSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const roomIDBody = { roomID };
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomIDBody),
      })
        .then((res) => {
          // if there is no room with that Id
          if (!res) {
            // give error message
            setWrongInfo(true);
          } else {
            // otherwise redirect user to waiting room
            <Redirect
              to={{
                pathname: '/waiting' + roomID,
              }}
            />;
          }
        })
        .catch((err) => console.log('this is err', err));
    }
  };
  return (
    <div className='homePage'>
      <h1>Welcome to Rinder </h1>
      <form onSubmit={handleLocationSubmit}>
        <label>
          <p>Enter Location</p>
          <input
            type='text'
            name='locationText'
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <div className='locationButton'>
          <button type='submit'>Create Room</button>
        </div>
        {missingInfo ? <div>Please enter a location</div> : null}
        {wrongInfo ? <div>Please enter an accurate location</div> : null}
      </form>
      <form onSubmit={handleRoomIDSubmit}>
        <label>
          <p>Enter the Room ID number</p>
          <input
            type='text'
            name='roomIDText'
            onChange={(event) => setRoomID(event.target.value)}
          />
        </label>
        <div className='joinRoomButton'>
          <button type='submit'>Join Room</button>
        </div>
        {missingInfo ? <div>Please input a Room ID number</div> : null}
        {wrongInfo ? <div>Please enter an accurate Room ID Number</div> : null}
      </form>
    </div>
  );
};

export default HomePage;
