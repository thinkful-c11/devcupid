import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class Question extends React.Component {
  componentDidMount() {
    const { questionId, onboardingQuestions } = this.props;
    const currentQuestion = onboardingQuestions[questionId];
    console.log(currentQuestion);
  }
  render() {
    return (
      <div>
        TESTING
      </div>
    );
  }
}

const mapStateToProps = state => ({
  onboardingQuestions: state.onboardingQuestions
});

export default connect(mapStateToProps)(Question);
