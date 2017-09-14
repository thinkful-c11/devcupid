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
    console.log(this.props.user);
    if(this.props.loggedIn){
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
                <Link to='/team/myteams' onClick={ ()=> this.handleNav() }>Your Team</Link>
              </li>
              <li>
                <Link to={'/me'} onClick={ ()=> this.handleNav() }> View Your Profile </Link>
              </li>
              <li>
                <a href='/api/auth/github/logout' onClick={ ()=> this.handleNav() }>Signout</a>
              </li>
            </ul>
          </nav>
          {/* <div className='burgerMenu'>
            <div className='burger top part' />
            <div className='burger middle part' />
            <div className='burger bottom part' />
          </div> */}
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
  user: state.profile
})

export default connect(mapStateToProps)(Header);
