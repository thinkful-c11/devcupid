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
        <h2>Hi, welcome to the onboarding questionnaire!</h2>
        <p>
          In order to find people on dev cupid, people must also be able to find you. That's only fair, right?
          You wouldn't want your perfect team member to be hiding from you, would ya? Didn't think so.
        </p>
        <p>
          Not everything on here is <span className="italic">totally</span> required, 
          but it's all strongly suggested. If you don't have time to do the whole thing right now, that's totally fine! We'll hold your place
          for the next time you log in.
        </p>
        <p>
          These questions focus on the bare bones of a profile: What you like, what you know, and how to get in touch with you.
          In the future you may choose to build out your profile with some more personality information by answering
          some further questions. That's totally optional, but you will only have access to other users' personality
          information if you've taken the time to flesh out yours.
        </p>
        <p>
          You ready?
        </p>
        <button><Link to='/onboarding/0'>Let's get started.</Link></button>
      </div>
    );
  }
}
