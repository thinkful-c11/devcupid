import React from 'react';

export default class SignUp extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        { currentQuestion.choices.map((q, index) => {
            return (
              <div key={index + q.key}>
                <label htmlFor={q.key}>{q.label}</label>
                <input id={q.key} type='text' />
              </div>
            );
          })
        }
      </div>
    );
  }
}