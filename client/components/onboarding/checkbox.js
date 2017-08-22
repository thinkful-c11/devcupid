import React from 'react';

export default class Checkbox extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        {
          currentQuestion.choices.map((q, index) => {
            return (
              <div key={index}>
                <label htmlFor={index}>{q}</label>
                <input id={index} type='checkbox' value={q} />
              </div>
            );
          })
        }
      </div>
    );
  }
}