import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import * as actions from '../actions/actions';

import LoginScreen from './LoginScreen';
import OnboardingContainer from './OnboardingScreen';
import ProfileScreen from './ProfileScreen';
import Chat from '../components/chat/Chat';

import TeamScreen from './TeamScreen';

import Search from './Search';

import Header from '../components/static/header';
import Footer from '../components/static/footer';
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
    const {onboardProgress, onboarded} = this.props;
    return (
      <div className='major-cont'>
        <Router history={browserHistory}>
          <div style={{width:'100%', height:'100vh', display:'flex', flexDirection:'column'}}>
            <Header loggedIn={loggedIn} />
            <main className='content'>
              {/* <Route exact path='/' component={LoginScreen} /> */}
              <Route
                path='/search'
                component={Search} />

              <Route
                path='/onboarding/:questionId'
                component={OnboardingContainer} />

              <Route
                exact path='/home'
                render={() => (
                  <Redirect to='/me' />
                )} />

              <Route
                exact path='/me'
                component={ProfileScreen} />

              <Route
                exact path='/chat/:type/:id'
                component={Chat} />

              <Route exact path='/' render={() => {
                switch(loggedIn){
                case true:
                  switch(onboarded){
                  case false:
                    return <Redirect to={onboardProgress < 0 ? '/onboarding/intro' : `/onboarding/${onboardProgress}`} />;
                  default:
                    return <Redirect to={'/home'} />;
                  }
                  break;
                case false:
                  return <LoginScreen />;
                }
              }} />

              <Route exact path='/profile/:userId' component={ProfileScreen} />

              <Route
                path='/team/:teamId'
                component={TeamScreen} />

            </main>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  onboardProgress: state.onboardProgress,
  onboarded: state.onboarded
});
export default connect(mapStateToProps)(App);
