import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginScreen extends React.Component {
  render() {
    let questionId = (this.props.questionId) ? this.props.questionId : 0;
    return(
      <div className='login-container'>
        <Link to={`/onboarding/${questionId}`}>Sign Up With GitHub</Link>
      </div>
    );
  }
}
