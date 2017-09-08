import React from 'react';
import { Link } from 'react-router-dom';
/*
* https://www.codementor.io/yurio/all-you-need-is-react-firebase-4v7g9p4kf
*/

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      // Team Members, NOTE: admins may dupe with the rest
      admins,
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

    // This will need to be pulled out at some point
    // in order to make DB requests for all the info.
    const teamList = (activeTeam) => {
      const isReady = Object.getOwnPropertyNames(activeTeam).length;
      if (isReady) {
        // Creating a Set to eliminate duplicate roles.
        const membersArray = [
          ...admins,
          ...designers,
          ...developers,
          ...founders,
          ...projectManagers
        ];
        const membersSet = new Set([...membersArray]);

        const members = [...membersSet];

        const membersList = members.map((m, index) => {
          return (
            <li key={`${m}-${index}`}>
              {m}
            </li>
          );
        });

        return (
          <ul className='members-list'>
            {membersList}
          </ul>
        );
      }
      else return 'LOADING';
    };

    return (
      <div className='team-view-container'>
        <div className='team-info-conatainer'>
          <img src={avatar_url} alt='Team Image' />
          <h1>{name}</h1>
          <h3>{description}</h3>
          <h4>{location}</h4>
        </div>

        <div className='team-members-container'>
          {teamList(this.props.activeTeam)}
        </div>

        <Link to={`/chat/team/${this.props.teamId}`}> Team Chat </Link>

      </div>
    );
  }
}
