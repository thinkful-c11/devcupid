import React from 'react';

export default class Passions extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {user} = this.props;
    const passions = user.skills.passions.map((passion, index) => {
      return <li key={`passion ${index}`}>{passion}</li>
    })
    return(
      <ul>
        {passions}
      </ul>
    );
  }
}