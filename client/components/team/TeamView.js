import React from 'react';
import fire from '../../fire';

/*
* https://www.codementor.io/yurio/all-you-need-is-react-firebase-4v7g9p4kf
*/

export default class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
  }

  componentWillMount() {
    // Ref for messages in firebase
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(25);

    messagesRef.on('child_added', snapshot => {
      // Update state when new message added to Firebase db
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }

  addMessage(e) {
    e.preventDefault();
    // Send new message to the db
    fire.database().ref('messages').push(this.state.newMessage);
    this.setState({ newMessage: '' });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    const {
      // Team Members, NOTE: admins may dupe with the rest
      admins,
      designers,
      developers,
      founders,
      projectManagers,

      // Team Info
      avatar_url,
      name,
      description,
      location,
      email
    } = this.props.activeTeam;

    // This will need to be pulled out at some point
    // in order to make DB requests for all the info.
    const teamList = (activeTeam) => {
      const isReady = Object.getOwnPropertyNames(activeTeam).length;
      if (isReady) {
        // Creating a Set to eliminate duplicate roles.
        const membersArray = [
          ...admins,
          ...designers,
          ...developers,
          ...founders,
          ...projectManagers
        ];
        const membersSet = new Set([...membersArray]);

        const members = [...membersSet];

        const membersList = members.map((m, index) => {
          return (
            <li key={`${m}-${index}`}>
              {m}
            </li>
          );
        });

        return (
          <ul className='members-list'>
            {membersList}
          </ul>
        );
      }
      else return 'LOADING';
    };

    return (
      <div className='team-view-container'>
        <div className='team-info-conatainer'>
          <img src={avatar_url} alt='Team Image' />
          <h1>{name}</h1>
          <h3>{description}</h3>
          <h4>{location}</h4>
        </div>

        <div className='team-members-container'>
          {teamList(this.props.activeTeam)}
        </div>

        <form
          className='message-view-form'
          onSubmit={e => this.addMessage(e)}
          >
          <label htmlFor='new-message'>Send a message:</label>
          <input
            type='text'
            value={this.state.newMessage}
            onChange={e => this.handleChange(e)}
          />
          <ul className='messages-list'>
            {
              // Render the messages
              this.state.messages.map(m => <li key={m.id}>{m.text}</li>)
            }
          </ul>
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }
}
