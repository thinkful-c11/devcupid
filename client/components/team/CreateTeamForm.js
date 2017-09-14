import React from 'react';
import * as actions from '../../actions/actions';
import * as Cookies from 'js-cookie';

export default class CreateTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamFormData: {
        teamName: '',
        teamDescription: '',
        teamAvatarUrl: '',
        teamCompany: '',
        teamLocation: '',
        teamEmail: ''
      }
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    const newStateForm = Object.assign(
      {},
      this.state.teamFormData);
    newStateForm[name] = value;
    this.setState({ teamFormData: newStateForm });
  }

  handleSubmit(e) {
    e.preventDefault();
    const accessToken = Cookies.get('accessToken');
    // TODO: WHY IS PROPS COMING IN AS PROPS.PROPS???
    const { dispatch, gitHub } = this.props;
    const { teamFormData } = this.state;
    dispatch(actions.create_team(accessToken, gitHub.id, teamFormData));

    const clearedStateForm = {
      teamName: '',
      teamDescription: '',
      teamAvatarUrl: '',
      teamCompany: '',
      teamLocation: '',
      teamEmail: ''
    };

    this.setState({ teamFormData: clearedStateForm });
  }

  render() {
    // BUG: Whey does this work with no explicit onSubmit?
    return (
      <div className='create-team-container'>
        <form className='create-team-form' onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor='create-team-name'>
            Team Name
          </label>
          <input
            id='create-team-name'
            type='text'
            value={this.state.teamFormData.teamName}
            name='teamName'
            onChange={e => this.handleChange(e)}
            required
          />

          <label htmlFor='create-team-description'>
            Team Description
          </label>
          <input
            id='create-team-description'
            type='text'
            value={this.state.teamFormData.teamDescription}
            name='teamDescription'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-avatar'>
            Team Image
          </label>
          <input
            id='create-team-avatar'
            type='text'
            value={this.state.teamFormData.teamAvatarUrl}
            name='teamAvatarUrl'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-company'>
            Team Company
          </label>
          <input
            id='create-team-company'
            type='text'
            value={this.state.teamFormData.teamCompany}
            name='teamCompany'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-location'>
            Team Location
          </label>
          <input
            id='create-team-location'
            type='text'
            value={this.state.teamFormData.teamLocation}
            name='teamLocation'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-email'>
            Team Email
          </label>
          <input
            id='create-team-email'
            type='text'
            value={this.state.teamFormData.teamEmail}
            name='teamEmail'
            onChange={e => this.handleChange(e)}
          />

          <button
            type='submit'
          >
            Submit</button>
        </form>
      </div>
    );
  }
}
