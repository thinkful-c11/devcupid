import React from 'react';

export default class TextInput extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        <label htmlFor={currentQuestion.choices[0].key}>
          {currentQuestion.choices[0].label}
        </label>
        <input id={currentQuestion.choices[0].key} type='text'/>
      </div>
    );
  }
}