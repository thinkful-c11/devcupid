import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import * as Cookies from 'js-cookie';

import CreateTeamForm from '../team/CreateTeamForm';

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
    const route = this.props.match.params.teamId;
    const view = (route) => {
      if (route === 'create') {
        return <CreateTeamForm props={this.props} />;
      }
      else return 'THIS IS THE TEAM SCREEN FOR NOW';
    };

    return (
      <div>
        {view}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // This is not actually all that we'll need to bring in here.
    user: state.profile
  };
};

export default connect(mapStateToProps)(TeamScreen);
