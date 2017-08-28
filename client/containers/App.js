import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import * as actions from '../actions/actions';

import LoginScreen from './LoginScreen';
import OnboardingScreen from './OnboardingScreen';
import ProfileScreen from './ProfileScreen';
import Header from '../components/static/header';
import '../SCSS/App.scss';

export class App extends React.Component {
  componentDidMount() {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      this.props.dispatch(actions.fetchUser(accessToken));
    }
  }
  // Inital load triggers a 401 error when it tries to sign in
  render() {
    const loggedIn = this.props.user;
    return (
      <div>
        <Header />
        <Router>
          <main>
            {/* <Route exact path='/' component={LoginScreen} /> */}
            <Route
              exact path='/onboarding/:questionId'
              // path='/onboarding' re Issue #2
              component={OnboardingScreen} />

            <Route exact path='/' render={() => (
              loggedIn ? (
                <Redirect to='/onboarding/intro' />
              ) : (
                <LoginScreen />
                )
            )} />
            <Route exact path='/me' component={ProfileScreen} />
          </main>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(App);
