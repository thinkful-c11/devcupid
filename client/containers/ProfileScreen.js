import React from 'react';
import { connect } from 'react-redux';

import ProfileHeader from '../components/profile/profileHeader';

export class ProfileScreen extends React.Component{
  render(){
    const { user } = this.props;
    return(
      <div>
       <ProfileHeader user={user}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profile
});

export default connect(mapStateToProps)(ProfileScreen);