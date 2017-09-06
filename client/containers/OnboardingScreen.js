import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import * as Cookies from 'js-cookie';

import SubmitButton from '../components/onboarding/SubmitButton';
import NextButton from '../components/onboarding/nextButton';
import SignUp from '../components/onboarding/signup';
import TextInput from '../components/onboarding/textInput';
import Checkbox from '../components/onboarding/checkbox';
import CheckboxNested from '../components/onboarding/checkboxNested';
import OnboardingIntro from '../components/onboarding/onboardingIntro/onboardingIntro';
import Progress from '../components/onboarding/onboardingBlocks/progress';

export class OnboardingScreen extends React.Component {

  handleNextButton() {
    const accessToken = Cookies.get('accessToken');
    const { dispatch, profile, gitHubId } = this.props;
    const progress = parseInt(this.props.match.params.questionId) + 1;
    const onboarded = false;
    dispatch(
      actions.onboard_progress(gitHubId, profile, accessToken, progress, onboarded, null, actions.update_profile
    ));
  }

  handleSubmitButton(){
    const { dispatch, profile, gitHubId, onboardingQuestions } = this.props;
    const progress = 100;
    const onboarded = true;
    const accessToken = Cookies.get('accessToken');
    let currentIndex = parseInt(this.props.match.params.questionId);
    const currentQuestion = onboardingQuestions[currentIndex];
    let key = currentQuestion.key;
    dispatch(actions.onboard_progress(gitHubId, profile, accessToken, progress, onboarded));
  }

  handleNestedLanguageButton() {
    const { dispatch, profile, gitHubId, onboardingQuestions } = this.props;
    const progress = parseInt(this.props.match.params.questionId) + 1;
    const onboarded = false;
    const accessToken = Cookies.get('accessToken');
    let currentIndex = parseInt(this.props.match.params.questionId);
    const currentQuestion = onboardingQuestions[currentIndex];
    let key = currentQuestion.key;
    dispatch(actions.onboard_progress(gitHubId, profile, accessToken, progress, onboarded, key, actions.update_skills));
  }

  render() {
    if (this.props.match.params.questionId === 'intro'){
      return <OnboardingIntro dispatch={this.props.dispatch} history={this.props.history}/>;
    }
    else{
      const {onboardingQuestions} = this.props;
      let currentIndex = parseInt(this.props.match.params.questionId);
      const currentQuestion = onboardingQuestions[currentIndex];
      let question;
      let button;

      if((currentIndex + 1) === onboardingQuestions.length){
        button = <SubmitButton history={this.props.history} onClick={() => this.handleSubmitButton()} />;
      }

      else if(currentQuestion.type === 'checkbox' || currentQuestion.type === 'checkbox-nested') {
        button = <NextButton nextQuestion={++currentIndex} onClick={() => this.handleNestedLanguageButton()} />;
      }

      else{
        button = <NextButton nextQuestion={++currentIndex} onClick={() => this.handleNextButton()} />;
      }

      switch(currentQuestion.type){
      case 'signup':
        question = <SignUp currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} button={button} />;
        break;
      case 'textInput':
        question = <TextInput currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} button={button} />;
        break;
      case 'checkbox':
        question = <Checkbox currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} key={currentQuestion.text} button={button} />;
        break;
      case 'checkbox-nested':
        question = <CheckboxNested currentQuestion={currentQuestion} dispatch={this.props.dispatch} profile={this.props.profile} button={button} />;
      }

      return (
        <div className='onboarding terminal-card'>
          {question}
          <Progress index={currentIndex} length={onboardingQuestions.length}/>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  onboardingQuestions: state.onboardingQuestions,
  profile: state.profile,
  gitHubId: state.gitHub.id
});

const OnboardingContainer = withRouter(connect(mapStateToProps)(OnboardingScreen));

export default OnboardingContainer;
