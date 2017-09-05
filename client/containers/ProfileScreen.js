import React from 'react';
import { connect } from 'react-redux';

import ProfileHeader from '../components/profile/profileHeader';
import About from '../components/profile/about';
import Roles from '../components/profile/roles';
import Tech from '../components/profile/tech';
import Passions from '../components/profile/passions';
import SoftwareTools from '../components/profile/softwareTools';
import ContactButton from '../components/profile/contactButton';

import '../SCSS/profile.scss'

export class ProfileScreen extends React.Component{
  render(){
    const { user } = this.props;
    return(
      <div className="profile container">
        <div className="section A container">
          <div className="column A container">
            <ProfileHeader user={user} />
            <About user={user} />
          </div>
          <div className="column B container">
            <ContactButton user={user}/>
            <div className="section container">
              <Roles user={user} />
              <Tech user={user} />
            </div>
          </div>
        </div>
        <div className="section B container">
          <Passions user={user} />
          <SoftwareTools user={user} />
        </div>
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
