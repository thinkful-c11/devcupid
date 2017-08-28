import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

export class LoginScreen extends React.Component {
  render() {
    return(
      <div className='login-container'>
        <div><a href='/api/auth/github'> Sign In With GitHub </a></div>
        <div><p>DevCupid is a place for developers and designers to match with each other, creating the perfect dream teams that they desire for any project. Search to find others who are just as passionate about your interests and projects by passions, languages, libraries, frameworks, and more. </p></div>
      </div>
    );
  }
}

export default connect()(LoginScreen);


{/* <div className="temporary-button"><a href="/auth/github/callback">CLICK ME TO SIGN IN FOR NOW</a></div> */}
