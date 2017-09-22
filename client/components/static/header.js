import React from 'react';
import '../../SCSS/header.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      navOpen:false
    }
  }

  handleNav(){
    let navOpen = !this.state.navOpen
    this.setState({
      navOpen: navOpen
    });
  }

  render(){
    let header;
    const onOnboarding = window.location.pathname.split('/')[1] === 'onboarding';
    if(this.props.loggedIn && !onOnboarding){
      header = (
        <div className='topBar content container'>
          <div className='logo'><img src='/public/logo.svg' /></div>
          <nav>
            <img src={this.props.user.avatar_url} className="navThumbnail" onClick={ ()=> this.handleNav() }/>
            <ul className={this.state.navOpen ? "userNav" : "userNav closed"}>
              <li>
                <Link to={'/search'} onClick={ ()=> this.handleNav() }> Search </Link>
              </li>
              <li>
                <Link to='/team/create' onClick={ ()=> this.handleNav() }>Create a Team</Link>
              </li>
              <li>
                <Link to={'/me'} onClick={ ()=> this.handleNav() }> View Your Profile </Link>
              </li>
              <li>
                <a href='/api/auth/github/logout' onClick={ ()=> this.handleNav() }>Signout</a>
              </li>
            </ul>
          </nav>
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

const mapStateToProps = state => ({
  onboarded: state.onboarded,
  user: state.profile
});

export default connect(mapStateToProps)(Header);
