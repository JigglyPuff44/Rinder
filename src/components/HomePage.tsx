import { networkInterfaces } from 'node:os';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Redirect,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';
import { RootState } from '../state/reducers';
import WaitingRoom from './WaitingRoom';
import {
  FormLabel,
  Flex,
  FormControl,
  Heading,
  Box,
  Button,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

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
  // link to store
  const store: any = useSelector<RootState>((state) => state.store);

  let history = useHistory();

  // post request to server to write into db of restaurant list
  const sendRestList = () => {
    fetch('/restaurants', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store.restList),
    })
      .then((res) => res.json())
      .catch((err) => console.log('this is err', err));
  };

  // get request to server for generated room id and save to store
  const genRoomID = () => {
    fetch('/roomID')
      .then((res) => res.json())
      .then((data) => newRoomID(data))
      .catch((err) => console.log('this is err', err));
  };

  const handleLocationSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // const location = { locationBody };
    // checks if user has entered a location
    if (!location) {
      // if not give error message
      //fetch request to google api to gather name, rating, address, photo for restaurant
      setMissingInfo(true);
    } else {
      console.log('location was entered');
      const userLocation = location.replace(' ', '+');
      console.log('this is userlocation', userLocation);
      const google_API = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+${userLocation}+united+states&key=AIzaSyC5NRHs0hj0_DyAwHqoTJ0KcGHx_UOstcI`;
      console.log('api', google_API);
      fetch(google_API, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        mode: 'cors',
        method: 'GET',
      })
        .then((res) => {
          console.log('this is res', res);
          return res.json();
        })
        .then((data) => {
          console.log('dataaaa', data);
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
          console.log('this is data', data);
          newRestList(realRestList);
        })
        .then(() => sendRestList())
        .then(() => genRoomID())
        .then(() => {
          history.push(`/waiting/${store.roomID}`);
        })
        .catch((err) => console.log('this is err', err));
      //   fetch('https://api.yelp.com/v3/businesses/search?location=NYC', {
      //     headers: {
      //       'Access-Control-Allow-Origin' : '*',
      //       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //       'Authorization': 'Bearers XCOuB7-lSc2CbHtRCfi3O1MOrqIUAr2r7NZHCuWLDVtvisJqoUT1yOFXlD_H067sm4SRHT4E_0pGUTZ1QPFOaIJjqz-zaYu3ZKA7Beu2NH854k1auhlyZVUUoPcnYXYx'
      //     },
      //     method: 'GET',
      //     mode: 'cors'
      //   })
      //   .then(res => {
      //     console.log('this is res', res);
      //     res.json()})
      //   .then(data => console.log('this is data', data));
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
      fetch('/roomID', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomIDBody),
      })
        .then((data) => {
          // if there is no room with that Id
          if (!data) {
            // give error message
            setWrongInfo(true);
          } else {
            return history.push(`/waiting/${roomID}`);
          }
        })
        .catch((err) => console.log('this is err', err));
    }
  };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FormControl>
      <Button rounded='50%' onClick={() => toggleColorMode()}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Flex
        direction='column'
        align='center'
        width='100%'
        justifyContent='center'
      >
        <div className='homePage'>
          <Flex
            direction='column'
            alignContent='center'
            align='center'
            justifyContent='center'
          >
            <Heading fontSize='x-large' align='center'>
              {' '}
              ???????????? Welcome to Rinder ????????????<br></br> {store.name}!
            </Heading>
            <br></br>
          </Flex>

          <form onSubmit={handleLocationSubmit}>
            <Flex
              direction='column'
              alignContent='center'
              align='center'
              justifyContent='center'
            ></Flex>
            <FormLabel>Enter Location</FormLabel>
            <Flex
              direction='column'
              alignContent='center'
              align='center'
              justifyContent='center'
            ></Flex>
            <Input
              type='text'
              name='name'
              placeholder='Enter Location'
              size='lg'
              focusBorderColor='teal'
              onChange={(event) => setLocation(event.target.value)}
            />

            <div className='locationButton'>
              <Flex
                direction='column'
                alignContent='center'
                align='center'
                justifyContent='center'
              >
                <Button type='submit' size='md' colorScheme='cyan'>
                  Create Room
                </Button>
              </Flex>
            </div>
            {missingInfo ? <div>Please enter a location</div> : null}
            {wrongInfo ? <div>Please enter an accurate location</div> : null}
          </form>
          <form onSubmit={handleRoomIDSubmit}>
            <br></br>
            <FormLabel>Enter the Room ID number</FormLabel>
            <Input
              placeholder='Enter the Room ID number'
              size='lg'
              focusBorderColor='teal'
              type='text'
              name='roomIDText'
              onChange={(event) => setRoomID(event.target.value)}
            />
            <div className='joinRoomButton'>
              <Flex
                direction='column'
                alignContent='center'
                align='center'
                justifyContent='center'
              >
                <Button type='submit' size='md' colorScheme='cyan'>
                  Join Room
                </Button>
              </Flex>
            </div>
            {missingInfo ? <div>Please input a Room ID number</div> : null}
            {wrongInfo ? (
              <div>Please enter an accurate Room ID Number</div>
            ) : null}
          </form>
        </div>
      </Flex>
    </FormControl>
  );
};

export default HomePage;
