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
      },
      // Pulled gitHub into state as comp was not rerendering
      // on fetch call.
      gitHub: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ gitHub: nextProps.props.gitHub });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ teamFormData: { [name]: value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    const accessToken = Cookies.get('accessToken');
    // TODO: WHY IS PROPS COMING IN AS PROPS.PROPS???
    const { dispatch } = this.props.props;
    // console.log(this.props);
    const { gitHub } = this.state;
    dispatch(actions.create_team(accessToken, gitHub.id, this.state));
  }

  render() {
    return (
      <div className='create-team-container'>
        <form className='create-team-form'>
          <label htmlFor='create-team-name'>
            Team Name
          </label>
          <input
            id='create-team-name'
            type='text'
            value={this.state.teamName}
            name='teamName'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-description'>
            Team Description
          </label>
          <input
            id='create-team-description'
            type='text'
            value={this.state.teamDescription}
            name='teamDescription'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-avatar'>
            Team Image
          </label>
          <input
            id='create-team-avatar'
            type='text'
            value={this.state.teamAvatarUrl}
            name='teamAvatarUrl'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-location'>
            Team Location
          </label>
          <input
            id='create-team-location'
            type='text'
            value={this.state.teamLocation}
            name='teamLocation'
            onChange={e => this.handleChange(e)}
          />

          <label htmlFor='create-team-email'>
            Team Email
          </label>
          <input
            id='create-team-email'
            type='text'
            value={this.state.teamEmail}
            name='teamEmail'
            onChange={e => this.handleChange(e)}
          />

          <button
            type='submit'
            onClick={e => this.handleSubmit(e)}>
            Submit</button>
        </form>
      </div>
    );
  }
}
