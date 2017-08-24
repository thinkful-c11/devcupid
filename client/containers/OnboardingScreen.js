import React from 'react';
import { connect } from 'react-redux';

import SubmitButton from '../components/onboarding/SubmitButton';
import NextButton from '../components/onboarding/nextButton';
import SignUp from '../components/onboarding/signup';
import TextInput from '../components/onboarding/textInput';
import Checkbox from '../components/onboarding/checkbox';
import CheckboxNested from '../components/onboarding/checkboxNested';
import OnboardingIntro from '../components/onboarding/onboardingIntro';

export class OnboardingScreen extends React.Component {
  render() {
    if (this.props.match.params.questionId === 'intro'){
      return <OnboardingIntro dispatch={this.props.dispatch} />;
    }
    else{
      const {onboardingQuestions} = this.props;
      let currentIndex = parseInt(this.props.match.params.questionId);
      const currentQuestion = onboardingQuestions[currentIndex];
      let question;
      let button;

      if((currentIndex + 1) === onboardingQuestions.length){
        button = <SubmitButton />;
      }
      else{
        button = <NextButton nextQuestion={++currentIndex} />;
      }

      switch(currentQuestion.type){
      case 'signup':
        question = <SignUp currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} />;
        break;
      case 'textInput':
        question = <TextInput currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} />;
        break;
      case 'checkbox':
        question = <Checkbox currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} key={currentQuestion.text} />;
        break;
      case 'checkbox-nested':
        question = <CheckboxNested currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} />;
      }

      return (
        <div className='onboarding-container'>
          {question}
          {button}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  onboardingQuestions: state.onboardingQuestions,
  profile: state.profile
});

export default connect(mapStateToProps)(OnboardingScreen);
