import React from 'react';
import { Link } from 'react-router-dom';

export default class OnboardingIntro extends React.Component{
  componentDidMount() {
    this.props.dispatch(actions.assignGitHubProfile());
  }
  render(){
    return(
      <div className='onboardIntro'>
        <h2>Hi, welcome to the onboarding quesionaire</h2>
        <Link to='/onboarding/0'>Let's get started.</Link>
      </div>
    );
  }
}
