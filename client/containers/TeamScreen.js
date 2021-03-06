import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import * as Cookies from 'js-cookie';

import CreateTeamForm from '../components/team/CreateTeamForm';
import TeamView from '../components/team/TeamView';
import MyTeams from '../components/team/myTeams';

export class TeamScreen extends React.Component {
  render () {
    const teamId = this.props.match.params.teamId;
    const { dispatch, gitHub, userTeams, activeTeam, profile, newTeam} = this.props;
    const view = (teamId) => {
      if (teamId === 'myteams') {
        return (
          <div>
            <CreateTeamForm
              gitHub={gitHub}
              userTeams={userTeams}
              activeTeam={activeTeam}
              profile={profile}
              teamId={teamId}
              dispatch={dispatch} 
              newteam={newTeam} />
              <MyTeams />
          </div>
        );
      }
      else return (
        <TeamView
          gitHub={gitHub}
          activeTeam={activeTeam}
          profile={profile}
          teamId={teamId} 
          Cookies={Cookies}
          actions={actions} 
          dispatch={dispatch} />
      );
    };

    return (
      <div>
        {view(teamId)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // This is not actually all that we'll need to bring in here.
    gitHub: state.gitHub,
    profile: state.profile,
    userTeams: state.userTeams,
    activeTeam: state.activeTeam
  };
};

export default connect(mapStateToProps)(TeamScreen);
