import React from 'react';

export default class ObjectWrapper extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="jsObjectWrapper">
        <div className="jsObjectHeader">
          <span className="jsKeyword">class </span>
          <span className="jsName">{this.props.qTitle} </span>
          <span className="jsKeyword">extends </span>
          <span className="jsName">User.{this.props.userName.split(' ').join('_')}</span>
          <span className="jsOpening" >{'{'}</span>
        </div>
        <div className="jsObjectContent">
          {this.props.children}
        </div>
        <span className="jsClosing" >{'}'}</span>
      </div>
    );
  }
}