import React from 'react';

export default class Prompt extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <label className="prompt" htmlFor={this.props.labelFor}>{"'"}{this.props.children}{"'"}<span className='jsPunc'>:</span> </label>
    );
  }
}