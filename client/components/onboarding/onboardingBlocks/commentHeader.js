import React from 'react';

export default class CommentHeader extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <p className="comment">//// {this.props.text}</p>
    );
  }
}