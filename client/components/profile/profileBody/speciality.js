import React from 'react';

export default class Speciality extends React.Component {
  formatSpecialty(user) {
    let specialties = user.skills.speciality;
    let formatted = [];
    console.log('SKILLS.SPECIALTY', specialties);
    for (let speciality in specialties) {
      if (specialties[speciality]) {
        formatted.push(speciality);
      }
    }
    return formatted;
  }

  render() {
    const { user } = this.props;
    const formattedSpecialty = this.formatSpecialty(user);
    console.log('SPECIAL', formattedSpecialty);
    const speciality = formattedSpecialty.map((speciality, index) => {
      return <li key={`speciality ${index}`}>{speciality}</li>;
    });
    return (
      <ul>
        {speciality}
      </ul>
    );
  }
}
