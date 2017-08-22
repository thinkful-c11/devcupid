import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import OnboardingScreen from './OnboardingScreen';
import '../SCSS/App.scss';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/onboarding' component={OnboardingScreen} />
        </main>
      </Router>
    );
  }
}
