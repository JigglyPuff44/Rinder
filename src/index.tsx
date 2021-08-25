import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './state';
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Login />
    </Router>
  </Provider>,
  document.getElementById('app')
);
