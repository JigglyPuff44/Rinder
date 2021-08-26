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
import {
  FormLabel,
  Flex,
  FormControl,
  Heading,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [missingInfo, setmissingInfo] = useState(false);
  const [wrongInfo, setwrongInfo] = useState(false);

  const dispatch = useDispatch();
  const { newName, newUserID } = bindActionCreators(actionCreators, dispatch);
  const currentUserID: any = useSelector<RootState>((state) => state.store);

  let history = useHistory();

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
            return history.push(`/home/${currentUserID.user_id}`);
          }
        })
        .catch((err) => console.log('this is err', err));
    }
  };
  return (
    <FormControl>
      <Flex
        direction='column'
        align='center'
        width='100%'
        justifyContent='center'
      >
        <div className='SignupPage'>
          <Flex
            direction='column'
            alignContent='center'
            align='center'
            justifyContent='center'
          >
            <Heading fontSize='lg'>Sign Up!</Heading>
          </Flex>
          <form onSubmit={handleSubmit}>
            <FormLabel>Name</FormLabel>
            <Flex
              direction='column'
              alignContent='center'
              align='center'
              justifyContent='center'
            >
              <Input
                type='text'
                name='name'
                placeholder='Enter Name'
                size='lg'
                focusBorderColor='teal'
                onChange={(event) => setName(event.target.value)}
              />
            </Flex>
            <FormLabel>Username</FormLabel>
            <Flex
              direction='column'
              alignContent='center'
              align='center'
              justifyContent='center'
            >
              <Input
                type='text'
                name='username'
                placeholder='Enter Username'
                size='lg'
                focusBorderColor='teal'
                onChange={(event) => setUsername(event.target.value)}
              />
            </Flex>

            <FormLabel>Password</FormLabel>
            <Input
              placeholder='Enter Password'
              size='lg'
              focusBorderColor='teal'
              type='password'
              name='password'
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className='signUpButton'>
              <Flex
                direction='column'
                alignContent='center'
                align='center'
                justifyContent='center'
              >
                <Button type='submit' size='md' colorScheme='cyan'>
                  Sign Up!
                </Button>
              </Flex>
            </div>

            {missingInfo ? <div>Please fill in all fields</div> : null}
            {wrongInfo ? <div>Please enter correct information</div> : null}
          </form>
        </div>
      </Flex>
    </FormControl>
  );
};

export default SignUp;
