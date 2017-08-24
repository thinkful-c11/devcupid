import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as Cookies from 'js-cookie';
import LoginScreen from './LoginScreen';
import OnboardingScreen from './OnboardingScreen';
import '../SCSS/App.scss';

export class App extends React.Component {
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      this.props.dispatch(actions.fetUser(accessToken));
    }
  }
  render() {
    return (
      <Router>
        <main>
          <Route exact path='/' component={LoginScreen} />
          <Route
            path='/onboarding/:questionId'
            // path='/onboarding' re Issue #2
            component={OnboardingScreen} />
        </main>
      </Router>
    );
  }
}

export default connect()(App);
