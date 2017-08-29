import React from 'react';
import * as actions from '../../actions/actions';
import * as ref from '../../actions/refs';

export default class SignUp extends React.Component{
  onChange(e) {
    let key = e.target.id;
    let value = e.target.value;
    this.props.dispatch(actions.signup_handler(key, value));
  }


  render() {
    const { currentQuestion } = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        { currentQuestion.choices.map((q, index) => {
          if (q.key === 'remoteOk') {
            return (
              <div key={index + q.key}>
                <label htmlFor={q.key}>{q.label}</label>
                <select
                  id={q.key}
                  onChange={e => this.onChange(e)}>
                  <option value={false}>Nope!</option>
                  <option value>Yes!</option>
                </select>
              </div>
            );
          }
          else {
            return (
              <div key={index + q.key}>
                <label htmlFor={q.key}>{q.label}</label>
                <input
                  id={q.key}
                  type='text'
                  onChange={e => this.onChange(e)} value={this.props.profile[q.key]} />
              </div>
            );
          }
        })
        }
      </div>
    );
  }
}
