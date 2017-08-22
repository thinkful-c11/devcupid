import React from 'react';

import SubmitButton from '../components/onboarding/SubmitButton';
import Question from '../components/onboarding/Question';

export default class OnboardingScreen extends React.Component {
  render() {
    return (
      <div className='onboarding-container'>
        <form className='question-form'>
          <Question questionId={this.props.params.questionId} />
        </form>
        <SubmitButton />
      </div>
    );
  }
}
