import React from 'react';


export default class About extends React.Component{
  render() {
    const {user} = this.props;
    return(
      <div className="about pop-card">
        <div className="cardHeader">
          About {user.name}
        </div>
        <div className="cardBody">
          <p>{user.bio}</p>
        </div>
      </div>
    );
  }
}
