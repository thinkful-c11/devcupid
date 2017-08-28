import React from 'react';

export default class Specialty extends React.Component {
  formatSpecialty(user) {
    let specialties = user.skills.specialty;
    let formatted = [];
    for (let specialty in specialties) {
      if (specialties[specialty]) {
        formatted.push(specialty);
      }
    }
    return formatted;
  }

  render() {
    const { user } = this.props;
    const formattedSpecialty = this.formatSpecialty(user);
    const specialty = formattedSpecialty.map((specialty, index) => {
      return <li key={`specialty ${index}`}>{specialty}</li>;
    });
    return (
      <ul>
        {specialty}
      </ul>
    );
  }
}
