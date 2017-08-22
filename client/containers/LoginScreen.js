import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginScreen extends React.Component {
  render() {
    return(
      <div className='login-container'>
        <Link to='/onboarding'>Sign Up With GitHub</Link>
      </div>
    );
  }
}
