import React from 'react';
import * as actions from '../../actions/actions';

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
        <h2>{currentQuestion.text}</h2>
        <label htmlFor={currentQuestion.choices[0].key}>
          {currentQuestion.choices[0].label}
        </label>
        <input id={currentQuestion.choices[0].key} type='text' onChange={ e=> this.onChange(e) } value={this.props.profile[currentQuestion.choices[0].key]} />
      </div>
    );
  }
}