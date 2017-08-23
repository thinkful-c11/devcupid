import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class LoginScreen extends React.Component {
  handleLogin(e) {
    e.preventDefault();
    this.props.dispatch(actions.authGithub());
  }
  render() {
    let questionId = (this.props.questionId) ? this.props.questionId : 0;
    return(
      <div className='login-container'>
        <div><a href='/api/auth/github'>Sign In With GitHub </a></div>
        <div><Link to={`/onboarding/${questionId}`}> Start Onboarding </Link></div>
      </div>
    );
  }
}

export default connect()(LoginScreen);


{/* <div className="temporary-button"><a href="/auth/github/callback">CLICK ME TO SIGN IN FOR NOW</a></div> */}
