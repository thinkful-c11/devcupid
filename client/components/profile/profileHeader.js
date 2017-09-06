import React from 'react';

export default class ProfileHeader extends React.Component{
  render() {
    const { user } = this.props;
    const remoteOk = user.remoteOk ? 'Remote Ok' : '';
    const hireable = user.hireable ? 'Hirable' : 'Not For Hire';
    return (
      <div className="profileHeader container">
        <div className="profileImage">
          <img src={user.avatar_url} />
        </div>
        <div className="topInfo">
          <h2 className={'userName'}>
            <span className="jsNameString">{user.name}</span>
            <span className="jsPunc">{':'}</span>
            <span className="jsBracket">{'{'}</span>
          </h2>
          <div className="basicInfo pop-card">
            <div className="cardHeader">
              {user.personalTitle}
            </div>
            <ul className="cardBody container">
              <li>
                {user.location}
                {remoteOk ? ' | ' : ''} 
                <span className="remote">
                  {remoteOk}
                </span>
                {','}
              </li>
              <li>
                {user.company} 
                {' | '}
                {hireable}
                {';'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
