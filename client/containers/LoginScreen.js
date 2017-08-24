import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginScreen extends React.Component {
  render() {
    return(
      <div className='login-container'>
        <div><a href='/api/auth/github'> Sign In With GitHub </a></div>
        <div><Link to={`/onboarding/intro`}> Start Onboarding </Link></div>
      </div>
    );
  }
}


<div className="temporary-button"><a href="/auth/github/callback">CLICK ME TO SIGN IN FOR NOW</a></div>