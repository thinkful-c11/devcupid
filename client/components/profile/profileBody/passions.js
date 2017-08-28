import React from 'react';

export default class Passions extends React.Component{
  constructor(props){
    super(props);
  }
  formatPassions(user) {
    let passions = user.skills.passions;
    let formatted = [];
    for (let passion in passions) {
      if (passions[passion]) {
        formatted.push(passion);
      }
    }
    return formatted;
  }
  render(){
    const { user } = this.props;
    const formattedPassions = this.formatPassions(user);
    const passions = formattedPassions.map((passion, index) => {
      return <li key={`passion ${index}`}>{passion}</li>;
    });
    return(
      <ul>
        {passions}
      </ul>
    );
  }
}
