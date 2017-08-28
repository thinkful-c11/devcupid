import React from 'react';
import '../../SCSS/header.scss'

export default class Header extends React.Component{
  render(){
    return(
      <header className="container">
        <div className="topBar content container">
          <div className="logo"><img src="/public/logo.svg"/></div>
          <div className="burgerMenu">
            <div className="burger top part"></div>
            <div className="burger middle part"></div>
            <div className="burger bottom part"></div>
          </div>
          {/* <nav></nav> */}
        </div>
      </header>
    );
  }
}