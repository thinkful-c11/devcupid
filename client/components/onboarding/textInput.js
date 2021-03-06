import React from 'react';
import * as actions from '../../actions/actions';

import CommentHeader from './onboardingBlocks/commentHeader';
import ObjectWrapper from './onboardingBlocks/objectWrapper';
import Prompt from './onboardingBlocks/prompt';
import InputField from './onboardingBlocks/inputField';

export default class TextInput extends React.Component{
  constructor(props){
    super(props);
  }

  onChange(e){
    let key = e.target.id;
    let value = e.target.value;
    this.props.dispatch(actions.textInput_handler(key, value));
  }

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <CommentHeader text={currentQuestion.text} />
        <ObjectWrapper qTitle={'About_Me'} userName={this.props.profile.name}>
          <div className="jsLine">  
            <Prompt htmlFor={currentQuestion.choices[0].key}>
              {currentQuestion.choices[0].label}
            </Prompt>
            <InputField id={currentQuestion.choices[0].key} type='text' onChange={ e=> this.onChange(e) } value={this.props.profile[currentQuestion.choices[0].key]} />
          </div>
          {this.props.button}
        </ObjectWrapper>
      </div>
    );
  }
}