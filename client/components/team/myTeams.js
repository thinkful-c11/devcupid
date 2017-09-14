import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class MyTeams extends React.Component{
  render(){
    const teams = this.props.teams.map((team, index) => {
      return <Link to={'/team/' + team._id} key={index}><li className="team"> {team.name} </li> </Link>
    })
    return(
      <div>
        <ul>
          {teams}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams
})

export default connect(mapStateToProps)(MyTeams);