import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import '../SCSS/loginScreen.scss';

export class LoginScreen extends React.Component {
  render() {
    return(
      <div className='landing content container'>
        <div className="column content container left">
          <div class="pop-card">
            <p>devCupid is a place for developers to find and match with one another to assemble the perfect team for any passion project, startup venture, open source library, or even full-time job.</p>

            <p>We believe that there is more to assembling a great team than resumes and portfolios - there has to be chemistry and a common goal that every contributor is passionate about.</p>

            <p>We hope you’re just as excited as we are.</p>
          </div>
        </div>
        <div className="column content container right">
          <div class="terminal-card">
            <pre>
            {`
class myTeam extends dreamTeam{
  founder: {
    name: 'Alva Snelling',
    skills:['Product Design', 'Ideation', 'Leadership']
  },
  designer:{
    name: 'Mckenna Haight',
    skills:['Sketch3', 'Storyboards', 'Logos', 'UI/UX']
  },
  devs:{
    frontEnd:{
      name: 'Dustin Bachchan',
      skills: ['React', 'CSS3', 'Accessibility']
    },
    backEnd: {
      name: 'Gale Hill',
      skills:['Node', 'DevOps', 'RESTful', 'mongoDB']
    },
    testWizard: {
      name: 'Kurt Courtenay',
      skills:['Mocha & Chai', 'Enzyme', 'Jest', 'TDD']
    }
  }
} 
            `}
            </pre>
          </div>
        </div>
        <button><a href='/api/auth/github'> Sign In With GitHub </a></button>
      </div>
    );
  }
}

export default connect()(LoginScreen);


{/* <div className="temporary-button"><a href="/auth/github/callback">CLICK ME TO SIGN IN FOR NOW</a></div> */}
