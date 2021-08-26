import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  NavLink,
  useHistory,
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";
import { RootState } from "./state/reducers";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignupPage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [missingInfo, setmissingInfo] = useState(false);
  const [wrongInfo, setwrongInfo] = useState(false);

  const store: any = useSelector<RootState>((state) => state.store);

  const dispatch = useDispatch();
  const { newUserID, newName } = bindActionCreators(actionCreators, dispatch);

  const switchUser = () => {
    console.log("this is switchUsra");
    return (
      <Router>
        <Redirect to="/signUp" />
        <Switch>
          <Route exact path="/signUp" component={SignUp}/>
            {/* <SignUp /> */}
          {/* </Route> */}
        </Switch>
      </Router>
    );
  };

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
          if (data === "username/password is incorrect") {
            // if the username/password is incorrect
            setwrongInfo(true);
          } else {
            newUserID(data.user_id);
            newName(data.name);
            return (
              <Router>
                <Switch>
                  <Route path={`/home/${store.userID}`}>
                    <HomePage />
                  </Route>
                </Switch>
              </Router>
            );
          }
        })
        .catch((err) => console.log("this is err", err));
    }
  };
  if (document.cookie) {
    return (
      <Router>
        <Switch>
          <Route path="/home/:userID">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    );
  } else {
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
          {missingInfo ? <div>Please fill in all fields</div> : null}
          {wrongInfo ? <div>Please enter correct information</div> : null}
        </form>
        <div className="noAccount">
          Don't have an account?
          <button onClick={switchUser}>Create an Account</button>
        </div>
      </div>
    );
  }
};

export default withRouter(Login);
