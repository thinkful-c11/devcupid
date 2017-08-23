import React from 'react';

export default class Checkbox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hold: false
    };
  }

  onClick(e){
    let key = e.target.value;
    let value = e.target.checked;
    this.setState({
      [key]: value
    });
  }

  
  

  render(){
    let passions = [];
    for(let k in this.state){
      if(this.state[k] === true){
        passions.push(k)
      }
    }
    console.log('Passions:', passions);
    const {currentQuestion} = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        {
          currentQuestion.choices.map((q, index) => {
            return (
              <div key={index}>
                <label htmlFor={index}>{q}</label>
                <input id={index} type='checkbox' value={q} onClick={ e=> this.onClick(e) }/>
              </div>
            );
          })
        }
      </div>
    );
  }
}