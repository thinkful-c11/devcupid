import React from 'react';
import { Link } from 'react-router-dom';

export default class NextButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {nextQuestion} = this.props;
    return(
      <Link to={`/onboarding/${nextQuestion}`}>
        <button>NEXT</button>
      </Link>
    );
  }
}