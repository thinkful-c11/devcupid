import React from 'react';

export default class Roles extends React.Component {
  formatRoles(user) {
    let roles = user.skills.roles;
    let formatted = [];
    for (let role in roles) {
      if (roles[role]) {
        formatted.push(role);
      }
    }
    return formatted;
  }

  render() {
    const { user } = this.props;
    const formattedRoles = this.formatRoles(user);
    const roles = formattedRoles.map((role, index) => {
      return <li key={`roles ${index}`}>{role}</li>;
    });
    return (
      <div className="pop-card roles">
        <div className="cardHeader">
          Roles
        </div>
        <ul className="cardBody">
          {roles}
        </ul>
      </div>
    );
  }
}
