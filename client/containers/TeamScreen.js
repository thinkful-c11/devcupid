import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import * as Cookies from 'js-cookie';

import CreateTeamForm from '../components/team/CreateTeamForm';
import TeamView from '../components/team/TeamView';

export class TeamScreen extends React.Component {
  componentDidMount() {
    const teamId = this.props.match.params.teamId;
    const accessToken = Cookies.get('accessToken');
    // TODO: add a team to store and pull in as a prop
    if (teamId !== 'create') {
      this.props.dispatch(actions.fetch_team(accessToken, teamId));
    }
  }

  render () {
    const teamId = this.props.match.params.teamId;
    const view = (teamId) => {
      if (teamId === 'create') {
        return <CreateTeamForm props={this.props} />;
      }
      else return (
        // <p>THIS IS A TEAM PAGE</p>
        <TeamView
          props={this.props}
          teamId={teamId} />
      );
    };

    return (
      <div>
        DOES THIS WORK?
        {view(teamId)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // This is not actually all that we'll need to bring in here.
    gitHub: state.gitHub
  };
};

export default connect(mapStateToProps)(TeamScreen);
