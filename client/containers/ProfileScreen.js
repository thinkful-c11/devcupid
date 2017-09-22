import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import ProfileHeader from '../components/profile/profileHeader';
import About from '../components/profile/about';
import Roles from '../components/profile/roles';
import Tech from '../components/profile/tech';
import Passions from '../components/profile/passions';
import SoftwareTools from '../components/profile/softwareTools';
import ContactButton from '../components/profile/contactButton';

import * as actions from '../actions/actions';

import '../SCSS/profile.scss';

export class ProfileScreen extends React.Component{
  constructor(props) {
    super(props);
    const path = window.location.pathname.split('/');
    if (!this.props.currentProfileView && path[1] === 'profile') {
      this.props.dispatch(actions.fetchProfile(path[2], Cookies.get('accessToken')));
    }
  }
  
  render(){
    const user = !this.props.currentProfileView ? 
                        this.props.user : this.props.currentProfileView;
                        
    const showContactButton = window.location.pathname.split('/')[1] !== 'home' ?
      <ContactButton user={user} /> : null;

    return(
      <div className="profile container">
        <div className="section A container">
          <div className="column A container">
            <ProfileHeader user={user} />
            <About user={user} />
          </div>
          <div className="column B container">
            {showContactButton}
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

const mapStateToProps = state => ({
  currentProfileView: state.currentProfileView,
  user: state.profile
});

export default connect(mapStateToProps)(ProfileScreen);
