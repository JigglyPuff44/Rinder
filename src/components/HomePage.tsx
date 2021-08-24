import React from 'react'
import { render } from 'react-dom';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
// page needs text with user name at the top
// div with create room button and location input text box
// div with join room button and roomId input text box
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Rinder </h1>
      <div>
        <CreateRoom></CreateRoom>
        <JoinRoom></JoinRoom>
      </div>
    </div>
  )
}

export default HomePage
