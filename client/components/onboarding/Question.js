import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

export class Question extends React.Component {
  componentDidMount() {
    const { questionId, onboardingQuestions } = this.props;
    const currentQuestion = onboardingQuestions[questionId];
  }
  render() {
    let { questionId, onboardingQuestions } = this.props;
    const currentQuestion = onboardingQuestions[questionId];
    console.log(currentQuestion);
    const nextQuestion = ++questionId;
    switch (currentQuestion.type) {
    case 'signup':
      return (
        <div>
          SIGNUP
          <Link
            to={`/onboarding/${nextQuestion}`}>
            <button>NEXT</button>
          </Link>
        </div>

      );
    case 'textInput':
      return (
        <div>
          TEXT INPUT
          <Link
            to={`/onboarding/${nextQuestion}`}>
            <button>NEXT</button>
          </Link>
        </div>

      );
    case 'checkbox':
      return (
        <div>
          CHECKBOX
          <Link
            to={`/onboarding/${nextQuestion}`}>
            <button>NEXT</button>
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  onboardingQuestions: state.onboardingQuestions
});

export default connect(mapStateToProps)(Question);
