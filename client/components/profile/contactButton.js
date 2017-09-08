import React from 'react';

export default class ContactButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let { user } = this.props;
    return(
      <div className="contact container">
        <button>
          <a target="_blank" href={`mailto:${user.email}`}>contact();</a>
        </button>
      </div>
    );
  }
}