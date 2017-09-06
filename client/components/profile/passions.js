import React from 'react';

export default class Passions extends React.Component {
  formatPassions(user) {
    let passions = user.skills.passions;
    let formatted = [];
    for (let passion in passions) {
      if (passions[passion]) {
        formatted.push(passion);
      }
    }
    return formatted;
  }
  render() {
    const { user } = this.props;
    const formattedPassions = this.formatPassions(user);
    const passions = formattedPassions.map((passion, index) => {
      return <li key={`passion ${index}`}>{passion}</li>;
    });
    return (
      <div className="pop-card interests">
        <div className="cardHeader">
          Interests
        </div>
        <ul className="cardBody">
          {passions}
        </ul>
      </div>
    );
  }
}
