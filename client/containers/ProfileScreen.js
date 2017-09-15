import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';

import ProfileHeader from '../components/profile/profileHeader';
import About from '../components/profile/about';
import Roles from '../components/profile/roles';
import Tech from '../components/profile/tech';
import Passions from '../components/profile/passions';
import SoftwareTools from '../components/profile/softwareTools';
import AddToTeam from '../components/profile/addToTeam';
import ContactButton from '../components/profile/contactButton';

import * as actions from '../actions/actions';

import '../SCSS/profile.scss';

export class ProfileScreen extends React.Component{
  constructor(props) {
    super(props);
    this.path = window.location.pathname.split('/');
  }

  componentWillMount(){
    if (this.path[1] === 'profile') {
      this.props.dispatch(actions.fetchProfile(this.path[2], Cookies.get('accessToken')));
    }
  }

  addToTeam(e){
    const teamSplit = e.target.value.split('/x/');
    const team = {
      id: teamSplit[0],
      name: teamSplit[1]
    };
    this.props.dispatch(actions.team_add_member(Cookies.get('accessToken'), team, this.props.currentProfileView));
  }
  
  render(){
    const user = (this.path[1] === 'profile' && this.props.currentProfileView  ? this.props.currentProfileView : this.props.user);
    return(
      <div className="profile container">
        <div className="section A container">
          <div className="column A container">
            <ProfileHeader user={user} />
            <About user={user} />
          </div>
          <div className="column B container">
            {/* <AddToTeam teams={this.props.teams} onChange={e=> this.addToTeam(e)}/>  */}
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

const mapStateToProps = state => ({
  currentProfileView: state.currentProfileView,
  user: state.profile,
  teams: state.teams
});

export default connect(mapStateToProps)(ProfileScreen);
