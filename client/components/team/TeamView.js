import React from 'react';

export default class TeamView extends React.Component {
  render() {
    console.log('VIEW', this.props);
    const {
      admins,
      // Team Members
      designers,
      developers,
      founders,
      projectManagers,

      // Team Info
      avatar_url,
      name,
      description,
      location,
      email
    } = this.props.activeTeam;

    return (
      <div className='team-view-container'>
        <div className='team-info-conatainer'>
          <img src={avatar_url} alt='Team Image' />
          <h1>{name}</h1>
          <h3>{description}</h3>
          <h4>{location}</h4>
        </div>
      </div>
    );
  }
}
