import React from 'react';
import '../../SCSS/header.scss';

export default class Header extends React.Component{
  render(){
    return(
      <header className='container'>
        <div className='topBar content container'>
          <div className='logo'><img src='/public/logo.svg' /></div>
          <nav>
            <ul>
              <li>
                <a href='/api/auth/github/logout'>Signout</a>
              </li>
            </ul>
          </nav>
          <div className='burgerMenu'>
            <div className='burger top part' />
            <div className='burger middle part' />
            <div className='burger bottom part' />
          </div>
        </div>
      </header>
    );
  }
}
