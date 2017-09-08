import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { search } from '../../actions/actions';

import SearchResults from './SearchResults';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      active: 'name',
      input:'',
      name: '', 
      login: '',
      languages: '',
      roles: ''
    };
  }
  
  formatQuery() {
    let s = '';
    
    this.state.name.length > 0 ? s += 'name=' + this.state.name + '&' : '';
    this.state.login.length > 0 ? s += 'login=' + this.state.login + '&' : '';
    this.state.languages.length > 0 ? s += 'languages=' + this.state.languages + '&' : '';
    this.state.roles.length > 0 ? s += 'roles=' + this.state.roles + '&' : '';
    
    return s;
  }

  handleChange(e){
    let prevActive = this.state.active;
    this.setState({
      [prevActive]: '',
      active: e.target.value
    });
  }

  handleInput(e){
    this.setState({
      input: this.input.value
    })
  }
  
  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.search(this.formatQuery());
  // }

  handleSubmit(e) {
    e.preventDefault();
    let key = this.state.active;
    let value = this.input.value;
    this.setState({
      [key]: value
    }, () => {
      let query = this.formatQuery();
      console.log(query);
      this.props.search(this.formatQuery());
    });
  }
  
  render() {
    return(
      <form className="search terminal-card" onSubmit={e=> handleSubmit(e)}>
        <div className="input-cont">
          <span className="searchBracket">{'{'}</span>
          <span className="view param">{this.state.active}
            <select className="searchParam" onChange={e=> this.handleChange(e)} >
              <option value={'name'}>Search By Name</option>
              <option value={'login'} onChange={e=> this.handleChange(e)}>Search By GitHub Username</option>
              <option value={'languages'} onChange={e=> this.handleChange(e)}>Search By Languages</option>
              <option value={'roles'} onChange={e=> this.handleChange(e)}>Search By Roles</option>
            </select>
          </span>
          <span className="searchPunc">{':'}</span>
          <span className="view input">{this.state.input}
            <input type="text" className="search" ref={input => this.input=input} onChange={e=> this.handleInput(e)}/>
          </span>
          <span className="searchBracket">{'}'}</span>
        </div>
          <button type="submit" onClick={e=> this.handleSubmit(e)}>
            <span className="searchFunc">search</span>
          </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  loading: state.loading
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    search: search
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);