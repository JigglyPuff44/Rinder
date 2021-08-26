import React, { useState, Dispatch } from 'react';
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
import { newUserID } from '../state/action-creators';
import { actionCreators } from '../state';
import { RootState } from '../state/reducers';
import HomePage from './HomePage';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [missingInfo, setmissingInfo] = useState(false);
  const [wrongInfo, setwrongInfo] = useState(false);

  const dispatch = useDispatch();
  const { newName, newUserID } = bindActionCreators(actionCreators, dispatch);
  const currentUserID: any = useSelector<RootState>((state) => state.store);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const signUpBody = { name, username, password };
    if (!name || !password || !username) {
      // checks if any fields are missing
      setmissingInfo(true);
    } else {
      // sends username and password to server
      fetch('/signUp', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpBody),
      })
        .then((response) => {
          console.log('it hit the api call');
          return response.json();
        })
        .then((data) => {
          if (data === 'username already exists') {
            // if the username/password isnt submitted
            setwrongInfo(true);
          } else {
            newName(data.name);
            newUserID(data.user_id);
            console.log('this is user_id', data.user_id);
            return (
              <Redirect to={`/home/${currentUserID.userID}`}/>
            );
          }
        })
        .catch((err) => console.log('this is err', err));
    }
  };
  return (
    <div className='SignupPage'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            type='name'
            name='name'
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          <p>Username</p>
          <input
            type='text'
            name='username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type='password'
            name='password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div className='signUpButton'>
          <button type='submit'>Sign Up</button>
        </div>
        {missingInfo ? <div>Please fill in all fields</div> : null}
        {wrongInfo ? <div>Please enter correct information</div> : null}
      </form>
    </div>
  );
};

export default SignUp;
