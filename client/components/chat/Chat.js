import React from 'react';
import fire from '../../fire';

export default class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.chat = null;
  }

  componentWillMount() {
    let {type} = this.props.match.params;
    let firebase = fire.database();
    let chat;
    if(type === 'team'){
      this.chat = firebase.ref(type + '_' + this.props.match.params.id + '/messages')
      .orderByKey()
      .limitToLast(25);
    }
    else if(type === 'private'){
      this.chat = firebase.ref(type + '_' + this.props.chatId + '/messages');
    }
    this.chat.on('child_added', snapshot => {
      // Update state when new message added to Firebase db
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }

  addMessage(e) {
    e.preventDefault();
    let {type} = this.props.match.params;
    let firebase = fire.database();
    let chat = firebase.ref(type + '_' + this.props.match.params.id + '/messages');
    // Send new message to the db
    chat.push(this.state.newMessage);
    this.setState({ newMessage: '' });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  render(){
    return(
      <div>
        <ul className='messages-list'>
          {
              // Render the messages
              this.state.messages.map(m => <li key={m.id}>{m.text}</li>)
            }
        </ul>
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
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }

}
