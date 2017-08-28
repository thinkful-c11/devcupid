import React from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/actions';

import '../../SCSS/onboardingIntro.scss';

export default class OnboardingIntro extends React.Component{
  componentDidMount() {
    this.props.dispatch(actions.assignGitHubProfile());
  }
  render(){
    return(
      <div className='onboardIntro'>
        <h2>Hi, welcome to the onboarding questionaire</h2>
        <button><Link to='/onboarding/0'>Let's get started.</Link></button>
      </div>
    );
  }
}
