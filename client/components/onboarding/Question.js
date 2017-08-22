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
      const choicesList = currentQuestion.choices.map((q, index) => {
        return (
          <div key={index + q.key}>
            <label htmlFor={q.key}>{q.label}</label>
            <input id={q.key} type='text' />
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
      whichQuestion = (
        <div>
          <h1>{currentQuestion.text}</h1>
          <label
            htmlFor={currentQuestion.choices[0].key}
            >{currentQuestion.choices[0].label}
          </label>
          <input
            id={currentQuestion.choices[0].key}
            type='text'
          />
        </div>
      );
      break;
    case 'checkbox':
      const checkboxList = currentQuestion.choices.map((q, index) => {
        return (
          <div key={index}>
            <label htmlFor={index}>{q}</label>
            <input id={index} type='checkbox' value={q} />
          </div>
        );
      });
      whichQuestion = (
        <div>
          <h1>{currentQuestion.text}</h1>
          {checkboxList}
        </div>
      );
      break;
    case 'checkbox-nested':
      const nestedList = currentQuestion.choices.map((q, index) => {
        return (
          <div key={index}>
            <label htmlFor={index}>{q.language}</label>
            <input id={index} type='checkbox' value={q.language} />
            {
                q.libraries.map((l, index) => {
                  return (
                    <div key={`language${index}`}>
                      <label htmlFor={`language${index}`}>{l}</label>
                      <input
                        id={`language${index}`}
                        type='checkbox'
                        value={l} />
                    </div>
                  );
                })
              }
          </div>
        );
      });
      whichQuestion = (
        <div>
          <h1>{currentQuestion.text}</h1>
          {nestedList}
        </div>
      );
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
