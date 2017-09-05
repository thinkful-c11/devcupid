import React from 'react';
import * as actions from '../../actions/actions';
import * as ref from '../../actions/refs';

import CommentHeader from './onboardingBlocks/commentHeader';
import ObjectWrapper from './onboardingBlocks/objectWrapper';
import Prompt from './onboardingBlocks/prompt';
import InputField from './onboardingBlocks/inputField';
import BooleanField from './onboardingBlocks/booleanField';

export default class SignUp extends React.Component{
  onChange(e) {
    console.log(e.target);
    let key = e.target.id;
    let value = e.target.value;
    this.props.dispatch(actions.signup_handler(key, value));
  }


  render() {
    console.log(this.props.profile)
    const { currentQuestion } = this.props;
    return(
      <div>
        <CommentHeader text={currentQuestion.text} />
        <ObjectWrapper qTitle={'Basic_Profile'} userName={this.props.profile.name} >
          { 
            currentQuestion.choices.map((q, index) => {
              if (q.key === 'remoteOk') {
                return (
                  <div key={index + q.key} className="jsLine">
                    <Prompt labelFor={q.key}>{q.label}</Prompt>
                    <BooleanField id={q.key} onChange={e => this.onChange(e)} />
                  </div>
                );
              }
              else {
                return (
                  <div key={index + q.key} className="jsLine">
                  <Prompt labelFor={q.key}>{q.label}</Prompt>
                    <InputField
                      id={q.key}
                      onChange={e => this.onChange(e)} 
                      value={this.props.profile[q.key]}
                      />
                  </div>
                );
              }
            })
          }
          {this.props.button}
        </ObjectWrapper>
      </div>
    );
  }
}
