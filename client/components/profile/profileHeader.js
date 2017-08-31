import React from 'react';

export default class ProfileHeader extends React.Component{
  render() {
    const { user } = this.props;
    const remoteOk = user.remoteOk ? '| Remote Ok' : '';
    return (
      <header>
        <div>
          <img src={user.avatar_url} />
        </div>
        <div>
          <h2>
            {user.name}
          </h2>
          <ul>
            <li>
              {user.location} {remoteOk}
            </li>
            <li>
              {user.personalTitle}
            </li>
          </ul>
        </div>
        <div>
          <a href={`mailto:${user.email}`}>Email Me</a>
        </div>
      </header>
    );
  }
}
