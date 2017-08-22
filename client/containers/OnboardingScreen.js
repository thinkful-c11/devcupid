import React from 'react';
import { connect } from 'react-redux';

import SubmitButton from '../components/onboarding/SubmitButton';
import NextButton from '../components/onboarding/nextButton';
import SignUp from '../components/onboarding/signup';
import TextInput from '../components/onboarding/textInput';
import Checkbox from '../components/onboarding/checkbox';
import CheckboxNested from '../components/onboarding/checkboxNested';

export class OnboardingScreen extends React.Component {
  render() {
    const {onboardingQuestions} = this.props;
    let currentIndex = this.props.match.params.questionId;
    const currentQuestion = onboardingQuestions[currentIndex];
    let question;

    switch(currentQuestion.type){
      case 'signup':
        question = <SignUp currentQuestion={currentQuestion}/>
        break;
      case 'textInput':
        question = <TextInput currentQuestion={currentQuestion}/>
        break;
      case 'checkbox':
        question = <Checkbox currentQuestion={currentQuestion}/>
        break;
      case 'checkbox-nested':
        question = <CheckboxNested currentQuestion={currentQuestion}/>
    }

    return (
        <form className='onboarding-container'>
          {question}
          <NextButton nextQuestion={++currentIndex}/>
          <SubmitButton />
        </form>
    );
  }
}

const mapStateToProps = state => ({
  onboardingQuestions: state.onboardingQuestions
});

export default connect(mapStateToProps)(OnboardingScreen);
