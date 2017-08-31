import React from 'react';
import * as actions from '../../actions/actions';

export default class Checkbox extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.currentQuestion.choices.forEach(choice => {
      this.setState({
        [choice]: false
      }, () => {
        for(let k in this.state){
          if(this.state[k] === true){
            this.state[k] = false
          }
        }
      })
    })
  }

  onClick(e){
    let key = e.target.id;
    let pos = e.target.value;
    let value = e.target.checked;
    this.setState({
      [pos]: value
    }, 
      () => {
        let arr = [];
        for(let k in this.state){
          if(this.state[k] === true){
            arr.push(k)
          }
        }
        this.props.dispatch(actions.checkbox_handler(key, this.state));
      }
    );
  }

  
  

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        {
          currentQuestion.choices.map((q, index) => {
            return (
              <div key={`${q}${index}`}>
                <label htmlFor={index}>{q}</label>
                <input className='input' type='checkbox' value={q} id={currentQuestion.key} onClick={e => this.onClick(e)} checked={this.state[q]} />
              </div>
            );
          })
        }
      </div>
    );
  }
}