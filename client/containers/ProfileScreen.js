import React from 'react';
import { connect } from 'react-redux';

import ProfileHeader from '../components/profile/profileHeader';
import ProfileBody from '../components/profile/profileBody';
import SearchBar from '../components/static/SearchBar';

export class ProfileScreen extends React.Component{
  render(){
    const { user } = this.props;
    return(
      <div>
        <ProfileHeader user={user} />
        <SearchBar />
        <ProfileBody user={user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.profile
  };
};

export default connect(mapStateToProps)(ProfileScreen);
