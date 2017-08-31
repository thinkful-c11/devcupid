import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import '../SCSS/loginScreen.scss';

export class LoginScreen extends React.Component {
  render() {
    return(
      <div className='landing content container'>
        <div className="column content container image">
          <img src="/public/lessthanthree.svg"/>
        </div>
        <div className="column content container copy">
          <p>DevCupid is a place for developers and designers to match with each other, creating the perfect dream teams that they desire for any project.</p>
          <p>Search to find others who are just as passionate about your interests and projects by passions, languages, libraries, frameworks, and more. </p>
          <button><a href='/api/auth/github'> Sign In With GitHub </a></button>
        </div>
      </div>
    );
  }
}

export default connect()(LoginScreen);


{/* <div className="temporary-button"><a href="/auth/github/callback">CLICK ME TO SIGN IN FOR NOW</a></div> */}
