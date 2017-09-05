import React from 'react';
import '../../SCSS/header.scss';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let header;
    if(this.props.loggedIn){
      header = (
        <div className='topBar content container'>
          <div className='logo'><img src='/public/logo.svg' /></div>
          <nav>
            <ul>
              <li>
                <a href='/api/auth/github/logout'>Signout</a>
              </li>
              {
              // The below throws an error as Header does not
              // have acces to the Router.
              /* <li>
                <Link to='/team/create'>Create a Team</Link>
              </li> */
              }
            </ul>
          </nav>
          <div className='burgerMenu'>
            <div className='burger top part' />
            <div className='burger middle part' />
            <div className='burger bottom part' />
          </div>
        </div>
      );
    }
    else{
      header = (
        <div className='topBar content container landing'>
          <div className='logo'><img src='/public/logo.svg' /></div>
        </div>
      );
    }
    return(
      <header className='container'>
        {header}
      </header>
    );
  }
}
