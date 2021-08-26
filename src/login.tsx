import React, { useState, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  NavLink,
  useHistory,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { RootState } from "./state/reducers";
import HomePage from "./components/HomePage";
import { newUserList } from "./state/action-creators";
import { FormLabel, Flex, FormControl, Heading, Box, Button, Input } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [missingInfo, setmissingInfo] = useState(false);
  const [wrongInfo, setwrongInfo] = useState(false);

  const store: any = useSelector<RootState>((state) => state.store);

  const dispatch = useDispatch();
  const { newUserID, newName } = bindActionCreators(actionCreators, dispatch);
  const bindAction = bindActionCreators(actionCreators, dispatch);


  let history = useHistory();
  let returnData:any;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const frontBody = { username, password };
    if (!username || !password) {
      // checks if any fields are missing
      setmissingInfo(true);
    } else {
      // sends username and password to server
      fetch('/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(frontBody),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data) {
            // if the username/password is incorrect
            setwrongInfo(true);
          } else {
            returnData = data;
            console.log('data_user', data.user_id)
            console.log('bind actions', bindAction);
            // newUserID(30);
            // console.log('this is newUserID', newUserID(30));
          }
        })
        .then(() => {
          console.log('this is newUserID', newUserID(30));
        })
        // .then(() => newName(returnData.name))
        .then(() => {
          console.log('this is store_user', store.user_id);
          console.log('this is store', store);
          history.push(`/home/${store.user_id}`);
        })
        .catch((err) => console.log("this is err", err));
    }
  };
  // if (document.cookie) {
  //   return <Redirect to="/home/:userID" />;
  // } else {
  return (
    <FormControl>
      <Flex
        direction='column'
        align='center'
        width='100%'
        justifyContent='center'
      >
        <div className='login'>
          <Flex
            direction='column'
            alignContent='center'
            align='center'
            justifyContent='center'
          >
            <Heading fontSize='lg'>Login</Heading>
          </Flex>
          <form onSubmit={handleSubmit}>
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
            <div className='loginButton'>
              <Flex
                direction='column'
                alignContent='center'
                align='center'
                justifyContent='center'
              >
                <Button type='submit' size='md' colorScheme='cyan'>
                  Login
                </Button>
              </Flex>
            </div>
            <div className='noAccount'>
              Don't have an account?{' '}
              <NavLink to='/Signup'>Create Account</NavLink>
            </div>
            {missingInfo ? <div>Please fill in all fields</div> : null}
            {wrongInfo ? <div>Please enter correct information</div> : null}
          </form>
        </div>
      </Flex>
    </FormControl>
  );
  // }
};

export default Login;
