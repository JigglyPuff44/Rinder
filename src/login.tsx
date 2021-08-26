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
import { actionCreators } from "./state";
import { RootState } from "./state/reducers";
import HomePage from "./components/HomePage";
import { useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [missingInfo, setmissingInfo] = useState(false);
  const [wrongInfo, setwrongInfo] = useState(false);

  const store: any = useSelector<RootState>((state) => {
    console.log('this is state.store', state.store);
    return state.store
  });

  const dispatch = useDispatch();
  const { newUserID, newName } = bindActionCreators(actionCreators, dispatch);
  const bindAction = bindActionCreators(actionCreators, dispatch);


  let history = useHistory();
  let returnData:any;

  useEffect(() => {
    if (store.user_id) {
      history.push(`/home/${store.user_id}`);
    }
  },[store.user_id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const frontBody = { username, password };
    if (!username || !password) {
      // checks if any fields are missing
      setmissingInfo(true);
    } else {
      // sends username and password to server
      fetch("/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
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
            newUserID(data.user_id);
          }
        })
        .then(() => newName(returnData.name))
        .catch((err) => console.log("this is err", err));
    }
  };
  // if (document.cookie) {
  //   return <Redirect to="/home/:userID" />;
  // } else {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input
              type="text"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <div className="loginButton">
            <button type="submit">Login</button>
          </div>
          <div className="noAccount">
            Don't have an account?{" "}
            <NavLink to="/Signup">Create Account</NavLink>
          </div>
          {missingInfo ? <div>Please fill in all fields</div> : null}
          {wrongInfo ? <div>Please enter correct information</div> : null}
        </form>
      </div>
    );
  // }
};

export default Login;