import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../actions/actions';

export default class AddToTeam extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.teams)
    let teams = this.props.teams.map((team,index) => {
      return <option key={index} value={team._id + '/x/' + team.name}> {team.name} </option>
    });
    return(
      <select onChange={e=> this.props.onChange(e)} placeholder={'add this user to...'} defaultValue=''>
        <option value='' disabled> add user to... </option>
        {teams}
      </select>
    );
  }
}