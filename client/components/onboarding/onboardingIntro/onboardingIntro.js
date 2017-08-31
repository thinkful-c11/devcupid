import React from 'react';

import { Link } from 'react-router-dom';

import { Route } from 'react-router-dom';

import * as actions from '../../../actions/actions';

import {introContent} from './introContent';

import '../../../SCSS/onboarding.scss';

export default class OnboardingIntro extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      i:0
    }
  }

  keydown(e){
    console.log(e.keyCode);
    if(e.keyCode == 32){
      this.setState({i: ++this.state.i});
    }
    if(this.state.i >= 6 && e.keyCode == 13){
      history.push('/onboarding/0');
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.assignGitHubProfile());
    this.term.focus();
  }

  render(){
    let content = [];
    for(let key in introContent){
      if(key <= this.state.i){
        if(key > 6){
          content.push(
            <p key={key} className="comment">{introContent[key]}<span className="func">Press enter to continue.</span></p>
          );
        }
        else{
          content.push(
            <p key={key} className="comment">{introContent[key]}</p>
          );
        }
        
      }
    }
    return(
      <div tabIndex='0' ref={(term) => this.term = term} className='onboarding terminal-card' onKeyDown={e=> this.keydown(e)}>
        {content}
      </div>
    );
  }
}
