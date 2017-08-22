import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

export class Question extends React.Component {
  render() {
    let { questionId, onboardingQuestions } = this.props;
    const currentQuestion = onboardingQuestions[questionId];
    console.log(currentQuestion);
    const nextQuestion = ++questionId;

    let whichQuestion;
    switch (currentQuestion.type) {
    case 'signup':
      const choicesList = currentQuestion.choices.map((q, index)=> {
        return (
          <div key={index + q.key}>
            <label id={q.key}>{q.label}</label>
            <input
              htmlFor={q.key}
              type='text'
            />
          </div>
        );
      });
      whichQuestion = (
        <div>
          <h1>{currentQuestion.text}</h1>
          {choicesList}
        </div>
      );
      break;
    case 'textInput':
      whichQuestion = 'TEXT INPUT';
      break;
    case 'checkbox':
      whichQuestion = 'CHECKBOX';
      break;
    }
    return (
      <div>
        {whichQuestion}
        <Link
          to={`/onboarding/${nextQuestion}`}>
          <button>NEXT</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  onboardingQuestions: state.onboardingQuestions
});

export default connect(mapStateToProps)(Question);
