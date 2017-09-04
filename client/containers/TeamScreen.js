import React from 'react';
import { connect } from 'react-redux';

export class TeamScreen extends React.Component {
  render () {
    return (
      <div>
        THIS IS THE TEAM SCREEN
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
