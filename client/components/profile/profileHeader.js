import React from 'react';

export default class ProfileHeader extends React.Component{

  shortenTitle(title){
    title = title.split('').slice(0,30);
    title.push('…');
    console.log(title);
    return title;
  }

  render() {
    const { user } = this.props;
    const remoteOk = user.remoteOk ? 'Remote Ok' : '';
    const hireable = user.hireable ? 'Hirable' : 'Not For Hire';
    const title = user.personalTitle.length > 30 ? this.shortenTitle(user.personalTitle) : user.personalTitle;
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
              {title}
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
