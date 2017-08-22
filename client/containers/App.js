import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import '../SCSS/App.scss';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={LoginScreen} />
      </Router>
    );
  }
}
