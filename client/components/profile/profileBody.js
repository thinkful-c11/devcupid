import React from 'react';
import Passions from './profileBody/passions';
import Tech from './profileBody/tech';
import Roles from './profileBody/roles';
import SoftwareTools from './profileBody/softwareTools';
import Speciality from './profileBody/speciality';


export default class ProfileBody extends React.Component{
  render() {
    const {user} = this.props;
    return(
      <div>
        <p>{user.bio}</p>
        <div>
          <h3> Interested In: </h3>
          <Passions user={user} />
        </div>
        <div>
          <h3> Tech Stack: </h3>
          <Tech user={user} />
        </div>
        <div>
          <h3> Roles: </h3>
          <Roles user={user} />
        </div>
        <div>
          <h3> Software Tools: </h3>
          <SoftwareTools user={user} />
        </div>
        <div>
          <h3> Specialties: </h3>
          <Speciality user={user} />
        </div>
        <div>
          <h3>Find Me Around The Web:</h3>
          <ul>
            <li>
              Portfolio: {user.personal_website}
            </li>
            <li>
              Blog: {user.blog}
            </li>
            <li>
              LinkedIn: {user.linked_in}
            </li>
            <li>
              Twitter: {user.twitter}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
